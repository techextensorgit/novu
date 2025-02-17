import { init, LDClient, LDMultiKindContext } from '@launchdarkly/node-server-sdk';
import { Injectable } from '@nestjs/common';
import { FeatureFlagsKeysEnum } from '@novu/shared';
import type { IFeatureFlagContext, IFeatureFlagsService } from './types';

@Injectable()
export class LaunchDarklyFeatureFlagsService implements IFeatureFlagsService {
  private client: LDClient;
  public isEnabled: boolean;

  public async initialize(): Promise<void> {
    const launchDarklySdkKey = process.env.LAUNCH_DARKLY_SDK_KEY;
    if (!launchDarklySdkKey) {
      throw new Error('Missing Launch Darkly SDK key');
    }
    this.client = init(launchDarklySdkKey);
    await this.client.waitForInitialization({ timeout: 10000 });
    this.isEnabled = true;
  }

  public async gracefullyShutdown(): Promise<void> {
    if (this.client) {
      await this.client.flush();
      this.client.close();
    }
  }

  async getBooleanFlag<T extends FeatureFlagsKeysEnum>({
    key,
    defaultValue,
    environment,
    organization,
    user,
  }: IFeatureFlagContext<T>): Promise<boolean> {
    return (await this.client.variation(
      key,
      this.buildLDContext({ user, organization, environment }),
      defaultValue
    )) as boolean;
  }
  async getNumberFlag<T extends FeatureFlagsKeysEnum>({
    key,
    defaultValue,
    environment,
    organization,
    user,
  }: IFeatureFlagContext<T>): Promise<number> {
    return (await this.client.variation(
      key,
      this.buildLDContext({ user, organization, environment }),
      defaultValue
    )) as number;
  }

  private buildLDContext<T extends FeatureFlagsKeysEnum>({
    user,
    organization,
    environment,
  }: Pick<IFeatureFlagContext<T>, 'user' | 'organization' | 'environment'>): LDMultiKindContext {
    const mappedContext: LDMultiKindContext = {
      kind: 'multi',
    };

    if (environment) {
      mappedContext.environment = {
        ...environment,
        key: environment._id,
      };
    }

    if (organization) {
      mappedContext.organization = {
        ...organization,
        key: organization._id,
      };
    }

    if (user) {
      mappedContext.user = {
        ...user,
        key: user._id,
      };
    }

    return mappedContext;
  }
}
