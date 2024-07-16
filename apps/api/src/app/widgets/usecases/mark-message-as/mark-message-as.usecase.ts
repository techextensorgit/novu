import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity, MessageRepository, SubscriberRepository, SubscriberEntity, MemberRepository } from '@novu/dal';
import {
  ChannelTypeEnum,
  FeatureFlagsKeysEnum,
  INVITE_TEAM_MEMBER_NUDGE_PAYLOAD_KEY,
  WebSocketEventEnum,
} from '@novu/shared';
import {
  WebSocketsQueueService,
  AnalyticsService,
  InvalidateCacheService,
  CachedEntity,
  buildFeedKey,
  buildMessageCountKey,
  buildSubscriberKey,
  GetFeatureFlag,
  GetFeatureFlagCommand,
} from '@novu/application-generic';

import { MarkEnum, MarkMessageAsCommand } from './mark-message-as.command';

@Injectable()
export class MarkMessageAs {
  constructor(
    private invalidateCache: InvalidateCacheService,
    private messageRepository: MessageRepository,
    private webSocketsQueueService: WebSocketsQueueService,
    private analyticsService: AnalyticsService,
    private subscriberRepository: SubscriberRepository,
    private memberRepository: MemberRepository,
    private getFeatureFlag: GetFeatureFlag
  ) {}

  async execute(command: MarkMessageAsCommand): Promise<MessageEntity[]> {
    await this.invalidateCache.invalidateQuery({
      key: buildFeedKey().invalidate({
        subscriberId: command.subscriberId,
        _environmentId: command.environmentId,
      }),
    });

    await this.invalidateCache.invalidateQuery({
      key: buildMessageCountKey().invalidate({
        subscriberId: command.subscriberId,
        _environmentId: command.environmentId,
      }),
    });

    const subscriber = await this.fetchSubscriber({
      _environmentId: command.environmentId,
      subscriberId: command.subscriberId,
    });

    if (!subscriber) throw new NotFoundException(`Subscriber ${command.subscriberId} not found`);

    await this.messageRepository.changeStatus(command.environmentId, subscriber._id, command.messageIds, command.mark);

    const messages = await this.messageRepository.find({
      _environmentId: command.environmentId,
      _id: {
        $in: command.messageIds,
      },
    });
    const isEnabled = await this.getFeatureFlag.execute(
      GetFeatureFlagCommand.create({
        key: FeatureFlagsKeysEnum.IS_TEAM_MEMBER_INVITE_NUDGE_ENABLED,
        organizationId: command.organizationId,
        userId: 'system',
        environmentId: 'system',
      })
    );
    if (command.mark.seen != null) {
      if (isEnabled && (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production')) {
        await this.sendAnalyticsEventForInviteTeamNudge(messages);
      }
      await this.updateServices(command, subscriber, messages, MarkEnum.SEEN);
    }

    if (command.mark.read != null) {
      await this.updateServices(command, subscriber, messages, MarkEnum.READ);
    }

    return messages;
  }

  private async updateServices(command: MarkMessageAsCommand, subscriber, messages, marked: MarkEnum) {
    this.updateSocketCount(subscriber, marked);

    for (const message of messages) {
      this.analyticsService.mixpanelTrack(`Mark as ${marked} - [Notification Center]`, '', {
        _subscriber: message._subscriberId,
        _organization: command.organizationId,
        _template: message._templateId,
      });
    }
  }

  private updateSocketCount(subscriber: SubscriberEntity, mark: MarkEnum) {
    const eventMessage = mark === MarkEnum.READ ? WebSocketEventEnum.UNREAD : WebSocketEventEnum.UNSEEN;

    this.webSocketsQueueService.add({
      name: 'sendMessage',
      data: {
        event: eventMessage,
        userId: subscriber._id,
        _environmentId: subscriber._environmentId,
      },
      groupId: subscriber._organizationId,
    });
  }

  private async sendAnalyticsEventForInviteTeamNudge(messages: MessageEntity[]) {
    const inviteTeamMemberNudgeMessage = messages.find(
      (message) => message?.payload[INVITE_TEAM_MEMBER_NUDGE_PAYLOAD_KEY] === true
    );

    if (inviteTeamMemberNudgeMessage) {
      this.analyticsService.track('Invite Nudge Seen', inviteTeamMemberNudgeMessage._subscriberId, {
        _organization: inviteTeamMemberNudgeMessage._organizationId,
      });
    }
  }

  @CachedEntity({
    builder: (command: { subscriberId: string; _environmentId: string }) =>
      buildSubscriberKey({
        _environmentId: command._environmentId,
        subscriberId: command.subscriberId,
      }),
  })
  private async fetchSubscriber({
    subscriberId,
    _environmentId,
  }: {
    subscriberId: string;
    _environmentId: string;
  }): Promise<SubscriberEntity | null> {
    return await this.subscriberRepository.findBySubscriberId(_environmentId, subscriberId);
  }
}
