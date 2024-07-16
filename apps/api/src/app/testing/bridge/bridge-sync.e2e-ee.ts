import { UserSession } from '@novu/testing';
import { expect } from 'chai';
import { EnvironmentRepository, NotificationTemplateRepository, MessageTemplateRepository } from '@novu/dal';
import { StepTypeEnum, WorkflowTypeEnum } from '@novu/shared';
import { BridgeServer } from '../../../../e2e/bridge.server';
import { workflow } from '@novu/framework';

describe('Bridge Sync - /bridge/sync (POST)', async () => {
  let session: UserSession;
  const environmentRepository = new EnvironmentRepository();
  const workflowsRepository = new NotificationTemplateRepository();
  const messageTemplateRepository = new MessageTemplateRepository();

  const inputPostPayload = {
    schema: {
      type: 'object',
      properties: {
        showButton: { type: 'boolean', default: true },
      },
    },
  };
  const outputPostPayload = {
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', default: 'firstName' },
      },
    },
  };

  let bridgeServer: BridgeServer;
  beforeEach(async () => {
    session = new UserSession();
    await session.initialize();
    bridgeServer = new BridgeServer();
  });

  afterEach(async () => {
    await bridgeServer.stop();
  });

  it('should update bridge url', async () => {
    await bridgeServer.start({ workflows: [] });

    const result = await session.testAgent.post(`/v1/bridge/sync`).send({
      bridgeUrl: bridgeServer.serverPath,
    });

    expect(result.body.data?.length).to.equal(0);

    const environment = await environmentRepository.findOne({ _id: session.environment._id });

    expect(environment?.echo.url).to.equal(bridgeServer.serverPath);

    const workflows = await workflowsRepository.find({ _environmentId: session.environment._id });
    expect(workflows.length).to.equal(0);
  });

  it('should create a workflow', async () => {
    const workflowId = 'hello-world';
    const newWorkflow = workflow(
      workflowId,
      async ({ step, payload }) => {
        await step.email(
          'send-email',
          async (controls) => {
            return {
              subject: 'This is an email subject ' + controls.name,
              body: 'Body result ' + payload.name,
            };
          },
          {
            controlSchema: {
              type: 'object',
              properties: {
                name: { type: 'string', default: 'TEST' },
              },
            } as const,
          }
        );
      },
      {
        payloadSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', default: 'default_name' },
          },
          required: [],
          additionalProperties: false,
        } as const,
      }
    );
    await bridgeServer.start({ workflows: [newWorkflow] });

    const result = await session.testAgent.post(`/v1/bridge/sync`).send({
      bridgeUrl: bridgeServer.serverPath,
    });
    expect(result.body.data?.length).to.equal(1);

    const workflowsCount = await workflowsRepository.find({ _environmentId: session.environment._id });
    const workflowData = await workflowsRepository.findById(result.body.data[0]._id, session.environment._id);

    expect(workflowData).to.be.ok;
    if (!workflowData) {
      throw new Error('Workflow not found');
    }

    expect(workflowsCount.length).to.equal(1);

    expect(workflowData.name).to.equal(workflowId);
    expect(workflowData.type).to.equal(WorkflowTypeEnum.BRIDGE);
    expect(workflowData.rawData.workflowId).to.equal(workflowId);
    expect(workflowData.triggers[0].identifier).to.equal(workflowId);

    expect(workflowData.steps.length).to.equal(1);
    expect(workflowData.steps[0].stepId).to.equal('send-email');
    expect(workflowData.steps[0].uuid).to.equal('send-email');
    expect(workflowData.steps[0].template?.name).to.equal('send-email');
  });

  it('should create a message template', async () => {
    const workflowId = 'hello-world';
    const newWorkflow = workflow(
      workflowId,
      async ({ step, payload }) => {
        await step.email(
          'send-email',
          async (controls) => {
            return {
              subject: 'This is an email subject ',
              body: 'Body result ',
            };
          },
          {
            controlSchema: inputPostPayload.schema as any,
          }
        );
      },
      {
        payloadSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', default: 'default_name' },
          },
          required: [],
          additionalProperties: false,
        } as const,
      }
    );
    await bridgeServer.start({ workflows: [newWorkflow] });

    const result = await session.testAgent.post(`/v1/bridge/sync`).send({
      bridgeUrl: bridgeServer.serverPath,
    });
    expect(result.body.data?.length).to.equal(1);

    const workflowsCount = await workflowsRepository.find({ _environmentId: session.environment._id });
    expect(workflowsCount.length).to.equal(1);

    const workflowData = await workflowsRepository.findById(result.body.data[0]._id, session.environment._id);
    expect(workflowData).to.be.ok;
    if (!workflowData) {
      throw new Error('Workflow not found');
    }

    const messageTemplates = await messageTemplateRepository.find({
      _id: workflowData.steps[0]._id,
      _environmentId: session.environment._id,
    });
    expect(messageTemplates.length).to.equal(1);
    const messageTemplatesToTest = messageTemplates[0];

    expect(messageTemplatesToTest.controls).to.deep.equal(inputPostPayload);
  });

  it('should update a workflow', async () => {
    const workflowId = 'hello-world';
    const newWorkflow = workflow(
      workflowId,
      async ({ step, payload }) => {
        await step.email(
          'send-email',
          async (controls) => {
            return {
              subject: 'This is an email subject ' + controls.name,
              body: 'Body result ' + payload.name,
            };
          },
          {
            controlSchema: {
              type: 'object',
              properties: {
                name: { type: 'string', default: 'TEST' },
              },
            } as const,
          }
        );
      },
      {
        payloadSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', default: 'default_name' },
          },
          required: [],
          additionalProperties: false,
        } as const,
      }
    );
    await bridgeServer.start({ workflows: [newWorkflow] });

    await session.testAgent.post(`/v1/bridge/sync`).send({
      bridgeUrl: bridgeServer.serverPath,
    });

    await bridgeServer.stop();

    bridgeServer = new BridgeServer();
    const workflowId2 = 'hello-world-2';
    const newWorkflow2 = workflow(
      workflowId2,
      async ({ step, payload }) => {
        await step.email(
          'send-email-2',
          async (controls) => {
            return {
              subject: 'This is an email subject ' + controls.name,
              body: 'Body result ' + payload.name,
            };
          },
          {
            controlSchema: {
              type: 'object',
              properties: {
                name: { type: 'string', default: 'TEST' },
              },
            } as const,
          }
        );

        await step.sms('send-sms-2', async () => {
          return {
            body: 'test',
          };
        });
      },
      {
        payloadSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', default: 'default_name' },
          },
          required: [],
          additionalProperties: false,
        } as const,
      }
    );
    await bridgeServer.start({ workflows: [newWorkflow2] });

    await session.testAgent.post(`/v1/bridge/sync`).send({
      bridgeUrl: bridgeServer.serverPath,
    });

    const workflows = await workflowsRepository.find({ _environmentId: session.environment._id });
    expect(workflows.length).to.equal(1);

    const workflowData = workflows[0];

    expect(workflowData.name).to.equal(workflowId2);
    expect(workflowData.type).to.equal(WorkflowTypeEnum.BRIDGE);
    expect(workflowData.rawData.workflowId).to.equal(workflowId2);
    expect(workflowData.triggers[0].identifier).to.equal(workflowId2);

    expect(workflowData.steps[0].stepId).to.equal('send-email-2');
    expect(workflowData.steps[0].uuid).to.equal('send-email-2');
    expect(workflowData.steps[0].name).to.equal('send-email-2');

    expect(workflowData.steps[1].stepId).to.equal('send-sms-2');
    expect(workflowData.steps[1].uuid).to.equal('send-sms-2');
    expect(workflowData.steps[1].name).to.equal('send-sms-2');
  });
});
