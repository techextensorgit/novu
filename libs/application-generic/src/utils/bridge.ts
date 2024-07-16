import { PlatformException } from './exceptions';
import { Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ChatProviderIdEnum, DigestTypeEnum } from '@novu/shared';
import {
  ChatOutput,
  DelayOutput,
  DigestOutput,
  digestRegularOutput,
  digestTimedOutput,
  EmailOutput,
  InAppOutput,
  PushOutput,
  SmsOutput,
} from '@novu/framework';

export function getDigestType(outputs: DigestOutput): DigestTypeEnum {
  if (isTimedDigestOutput(outputs)) {
    return DigestTypeEnum.TIMED;
  } else if (isLookBackDigestOutput(outputs)) {
    return DigestTypeEnum.BACKOFF;
  }

  return DigestTypeEnum.REGULAR;
}

export const isTimedDigestOutput = (
  outputs: DigestOutput | undefined
): outputs is digestTimedOutput => {
  return (outputs as digestTimedOutput)?.cron != null;
};

export const isLookBackDigestOutput = (
  outputs: DigestOutput
): outputs is digestRegularOutput => {
  return (
    (outputs as digestRegularOutput)?.lookBackWindow?.amount != null &&
    (outputs as digestRegularOutput)?.lookBackWindow?.unit != null
  );
};

export const isRegularDigestOutput = (
  outputs: DigestOutput
): outputs is digestRegularOutput => {
  return !isTimedDigestOutput(outputs) && !isLookBackDigestOutput(outputs);
};

export type IBridgeChannelResponse =
  | InAppOutput
  | ChatOutput
  | EmailOutput
  | PushOutput
  | SmsOutput;

export type IBridgeActionResponse = DelayOutput | DigestOutput;

export type IBridgeStepResponse =
  | IBridgeChannelResponse
  | IBridgeActionResponse;

export type ExecuteOutputMetadata = {
  status: string;
  error: boolean;
  /**
   * The duration of the step in milliseconds
   */
  duration: number;
};

enum BlocksTypeEnum {
  SECTION = 'section',
  SECTION1 = 'header',
}

enum TextTypeEnum {
  MARKDOWN = 'mrkdwn',
}

export interface IProviderOverride {
  webhookUrl: string;
  text: string;
  blocks: IBlock[];
}

export interface IBlock {
  type: `${BlocksTypeEnum}`;
  text: {
    type: `${TextTypeEnum}`;
    text: string;
  };
}

// todo extract option type from framework
export type IProvidersOverride = Record<ChatProviderIdEnum, IProviderOverride>;

// todo extract option type from framework
interface IExecutionOptions {
  skip?: boolean;
}

export type ExecuteOutput<OutputResult> = {
  outputs: OutputResult;
  metadata: ExecuteOutputMetadata;
  providers?: IProvidersOverride;
  options?: IExecutionOptions;
};
