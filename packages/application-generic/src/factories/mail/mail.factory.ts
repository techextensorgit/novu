import { IntegrationEntity } from '@novu/dal';
import {
  SendgridHandler,
  MailgunHandler,
  EmailJsHandler,
  MailjetHandler,
  MandrillHandler,
  NodemailerHandler,
  PostmarkHandler,
  SendinblueHandler,
  SESHandler,
  NetCoreHandler,
  MailerSendHandler,
  ResendHandler,
} from './handlers';
import { IMailHandler } from './interfaces/send.handler.interface';

export class MailFactory {
  handlers: IMailHandler[] = [
    new SendgridHandler(),
    new MailgunHandler(),
    new NetCoreHandler(),
    new EmailJsHandler(),
    new MailjetHandler(),
    new MandrillHandler(),
    new NodemailerHandler(),
    new PostmarkHandler(),
    new SendinblueHandler(),
    new SESHandler(),
    new MailerSendHandler(),
    new ResendHandler(),
  ];

  getHandler(integration: IntegrationEntity, from?: string): IMailHandler {
    try {
      const handler =
        this.handlers.find((handlerItem) =>
          handlerItem.canHandle(integration.providerId, integration.channel)
        ) ?? null;

      if (!handler) {
        throw new Error('Handler for provider was not found');
      }

      handler.buildProvider(integration.credentials, from);

      return handler;
    } catch (error) {
      throw new Error(
        `Could not build mail handler id: ${integration._id} error ${error}`
      );
    }
  }
}
