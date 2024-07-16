import { ChatProviderIdEnum } from '@novu/shared';
import { Schema } from '../../../types';
import { genericProviderSchemas } from '../generic.schema';
import { slackProviderSchemas } from './slack.schema';

export const chatProviderSchemas = {
  [ChatProviderIdEnum.Slack]: slackProviderSchemas,
  [ChatProviderIdEnum.Discord]: genericProviderSchemas,
  [ChatProviderIdEnum.GetStream]: genericProviderSchemas,
  [ChatProviderIdEnum.GrafanaOnCall]: genericProviderSchemas,
  [ChatProviderIdEnum.Mattermost]: genericProviderSchemas,
  [ChatProviderIdEnum.MsTeams]: genericProviderSchemas,
  [ChatProviderIdEnum.RocketChat]: genericProviderSchemas,
  [ChatProviderIdEnum.Ryver]: genericProviderSchemas,
  [ChatProviderIdEnum.WhatsAppBusiness]: genericProviderSchemas,
  [ChatProviderIdEnum.Zulip]: genericProviderSchemas,
} satisfies Record<ChatProviderIdEnum, { output: Schema }>;
