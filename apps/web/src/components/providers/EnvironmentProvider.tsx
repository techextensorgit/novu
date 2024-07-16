import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useQuery,
  useQueryClient,
  type QueryObserverResult,
  type RefetchOptions,
  type RefetchQueryFilters,
} from '@tanstack/react-query';
import { IEnvironment } from '@novu/shared';
import { QueryKeys } from '../../api/query.keys';
import { getEnvironments } from '../../api/environment';
import { createContextAndHook } from './createContextandHook';
import { IS_DOCKER_HOSTED } from '../../config/index';
import { BaseEnvironmentEnum } from '../../constants/BaseEnvironmentEnum';
import { useAuth } from './AuthProvider';

export type EnvironmentName = BaseEnvironmentEnum | IEnvironment['name'];

const LOCAL_STORAGE_LAST_ENVIRONMENT_ID = 'novu_last_environment_id';

export function saveEnvironmentId(environmentId: string) {
  localStorage.setItem(LOCAL_STORAGE_LAST_ENVIRONMENT_ID, environmentId);
}

export function getEnvironmentId() {
  return localStorage.getItem(LOCAL_STORAGE_LAST_ENVIRONMENT_ID) || '';
}

export function clearEnvironmentId() {
  return localStorage.removeItem(LOCAL_STORAGE_LAST_ENVIRONMENT_ID);
}

type EnvironmentContextValue = {
  currentEnvironment?: IEnvironment;
  // @deprecated use currentEnvironment instead;
  environment?: IEnvironment;
  environments?: IEnvironment[];
  refetchEnvironments: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IEnvironment[], unknown>>;
  switchEnvironment: (params: Partial<{ environmentId: string; redirectUrl: string }>) => Promise<void>;
  switchToDevelopmentEnvironment: (redirectUrl?: string) => Promise<void>;
  switchToProductionEnvironment: (redirectUrl?: string) => Promise<void>;
  isLoading: boolean;
  readOnly: boolean;
};

const [EnvironmentCtx, useEnvironmentCtx] = createContextAndHook<EnvironmentContextValue>('Environment Context');

function selectEnvironment(environments: IEnvironment[] | undefined, selectedEnvironmentId?: string) {
  let e: IEnvironment | undefined;

  if (!environments) {
    return;
  }

  // Find the environment based on the current user's last environment
  if (selectedEnvironmentId) {
    e = environments.find((env) => env._id === selectedEnvironmentId);
  }

  // Or pick the development environment
  if (!e) {
    e = environments.find((env) => env.name === BaseEnvironmentEnum.DEVELOPMENT);
  }

  if (!e) {
    throw new Error('Missing development environment');
  }

  saveEnvironmentId(e._id);

  return e;
}

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentOrganization } = useAuth();
  const {
    data: environments,
    isLoading,
    refetch: refetchEnvironments,
  } = useQuery<IEnvironment[]>([QueryKeys.myEnvironments, currentOrganization?._id], getEnvironments, {
    enabled: !!currentOrganization,
    retry: false,
    staleTime: Infinity,
  });

  const [currentEnvironment, setCurrentEnvironment] = useState<IEnvironment | undefined>(
    selectEnvironment(environments, getEnvironmentId())
  );

  const switchEnvironment = useCallback(
    async ({ environmentId, redirectUrl }: Partial<{ environmentId: string; redirectUrl: string }> = {}) => {
      setCurrentEnvironment(selectEnvironment(environments, environmentId));

      /*
       * TODO: Replace this revalidation by moving environment ID or name to the URL.
       * This call creates an avalanche of HTTP requests as the more you navigate across the app in a
       * single environment the more invalidations will be triggered on environment switching.
       */
      await queryClient.invalidateQueries();

      if (redirectUrl) {
        await navigate(redirectUrl);
      }
    },
    [queryClient, navigate, setCurrentEnvironment, environments]
  );

  const switchToProductionEnvironment = useCallback(
    async (redirectUrl?: string) => {
      const environmentId = environments?.find((env) => env.name === BaseEnvironmentEnum.PRODUCTION)?._id;

      if (environmentId) {
        await switchEnvironment({
          environmentId,
          redirectUrl,
        });
      } else {
        throw new Error('Production environment not found');
      }
    },
    [environments, switchEnvironment]
  );

  const switchToDevelopmentEnvironment = useCallback(
    async (redirectUrl?: string) => {
      const environmentId = environments?.find((env) => env.name === BaseEnvironmentEnum.DEVELOPMENT)?._id;

      if (environmentId) {
        await switchEnvironment({
          environmentId,
          redirectUrl,
        });
      } else {
        throw new Error('Development environment not found');
      }
    },
    [environments, switchEnvironment]
  );

  useEffect(() => {
    (async () => {
      if (environments) {
        await switchEnvironment({ environmentId: getEnvironmentId() });
      }
    })();
  }, [environments, switchEnvironment]);

  const value = {
    currentEnvironment,
    environment: currentEnvironment,
    environments,
    refetchEnvironments,
    switchEnvironment,
    switchToDevelopmentEnvironment,
    switchToProductionEnvironment,
    isLoading,
    readOnly: currentEnvironment?._parentId !== undefined,
  };

  return <EnvironmentCtx.Provider value={{ value }}>{children}</EnvironmentCtx.Provider>;
}

export function useEnvironment({ bridge }: { bridge?: boolean } = {}) {
  const { readOnly, ...rest } = useEnvironmentCtx();

  return {
    ...rest,
    readOnly: readOnly || (!IS_DOCKER_HOSTED && bridge) || false,
    // @deprecated use readOnly instead
    readonly: readOnly || (!IS_DOCKER_HOSTED && bridge) || false,
    bridge: (!IS_DOCKER_HOSTED && bridge) || false,
  };
}
