import { SmsProviderIdEnum } from '@novu/shared';
import { Schema } from '../../../types';
import { genericProviderSchemas } from '../generic.schema';
import { novuSmsProviderSchemas } from './novu-sms.schema';
import { twilioProviderSchemas } from './twilio';

export const smsProviderSchemas = {
  [SmsProviderIdEnum.Twilio]: twilioProviderSchemas,
  [SmsProviderIdEnum.Termii]: genericProviderSchemas,
  [SmsProviderIdEnum.Telnyx]: genericProviderSchemas,
  [SmsProviderIdEnum.SNS]: genericProviderSchemas,
  [SmsProviderIdEnum.Sms77]: genericProviderSchemas,
  [SmsProviderIdEnum.SmsCentral]: genericProviderSchemas,
  [SmsProviderIdEnum.Simpletexting]: genericProviderSchemas,
  [SmsProviderIdEnum.Sendchamp]: genericProviderSchemas,
  [SmsProviderIdEnum.RingCentral]: genericProviderSchemas,
  [SmsProviderIdEnum.Plivo]: genericProviderSchemas,
  [SmsProviderIdEnum.Nexmo]: genericProviderSchemas,
  [SmsProviderIdEnum.Mobishastra]: genericProviderSchemas,
  [SmsProviderIdEnum.MessageBird]: genericProviderSchemas,
  [SmsProviderIdEnum.Maqsam]: genericProviderSchemas,
  [SmsProviderIdEnum.Kannel]: genericProviderSchemas,
  [SmsProviderIdEnum.ISendSms]: genericProviderSchemas,
  [SmsProviderIdEnum.Infobip]: genericProviderSchemas,
  [SmsProviderIdEnum.Gupshup]: genericProviderSchemas,
  [SmsProviderIdEnum.GenericSms]: genericProviderSchemas,
  [SmsProviderIdEnum.FortySixElks]: genericProviderSchemas,
  [SmsProviderIdEnum.Firetext]: genericProviderSchemas,
  [SmsProviderIdEnum.Clickatell]: genericProviderSchemas,
  [SmsProviderIdEnum.BurstSms]: genericProviderSchemas,
  [SmsProviderIdEnum.BrevoSms]: genericProviderSchemas,
  [SmsProviderIdEnum.Bandwidth]: genericProviderSchemas,
  [SmsProviderIdEnum.AzureSms]: genericProviderSchemas,
  [SmsProviderIdEnum.AfricasTalking]: genericProviderSchemas,
  [SmsProviderIdEnum.Novu]: novuSmsProviderSchemas,
  [SmsProviderIdEnum.BulkSms]: genericProviderSchemas,
  [SmsProviderIdEnum.Clicksend]: genericProviderSchemas,
  [SmsProviderIdEnum.EazySms]: genericProviderSchemas,
} satisfies Record<SmsProviderIdEnum, { output: Schema }>;
