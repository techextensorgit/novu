import { useEffect, useCallback, useState } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { setUser as setSentryUser, configureScope } from '@sentry/react';
import type { IOrganizationEntity, IUserEntity } from '@novu/shared';
import { useAuth, useUser, useOrganization, useOrganizationList, useSession } from '@clerk/clerk-react';
import { OrganizationResource, UserResource } from '@clerk/types';
import { useSegment } from '../../../components/providers/SegmentProvider';
import { PUBLIC_ROUTES_PREFIXES, ROUTES } from '../../../constants/routes';

const toUserEntity = (clerkUser: UserResource): IUserEntity => ({
  _id: clerkUser.id,
  firstName: clerkUser.firstName,
  lastName: clerkUser.lastName,
  email: clerkUser.emailAddresses[0].emailAddress,
  profilePicture: clerkUser.imageUrl,
  createdAt: clerkUser.createdAt?.toString() ?? '',
  showOnBoarding: clerkUser.publicMetadata.showOnBoarding,
  showOnBoardingTour: clerkUser.publicMetadata.showOnBoardingTour,
  servicesHashes: clerkUser.publicMetadata.servicesHashes,
  jobTitle: clerkUser.publicMetadata.jobTitle,
  hasPassword: clerkUser.passwordEnabled,
});

const toOrganizationEntity = (clerkOrganization: OrganizationResource): IOrganizationEntity => ({
  _id: clerkOrganization.id,
  name: clerkOrganization.name,
  createdAt: clerkOrganization.createdAt.toString(),
  updatedAt: clerkOrganization.updatedAt.toString(),
  apiServiceLevel: clerkOrganization.publicMetadata.apiServiceLevel,
  defaultLocale: clerkOrganization.publicMetadata.defaultLocale,
  domain: clerkOrganization.publicMetadata.domain,
  productUseCases: clerkOrganization.publicMetadata.productUseCases,
});

export function useCreateAuthEnterprise() {
  const { signOut, orgId } = useAuth();
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { organization: clerkOrganization, isLoaded: isOrganizationLoaded } = useOrganization();
  const {
    setActive,
    isLoaded: isOrgListLoaded,
    userMemberships,
  } = useOrganizationList({ userMemberships: { infinite: true } });

  const [user, setUser] = useState<IUserEntity | undefined>(undefined);
  const [organization, setOrganization] = useState<IOrganizationEntity | undefined>(undefined);

  const ldClient = useLDClient();
  const segment = useSegment();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const inPublicRoute = Array.from(PUBLIC_ROUTES_PREFIXES.values()).find((prefix) =>
    location.pathname.startsWith(prefix)
  );
  const inPrivateRoute = !inPublicRoute;

  const logout = useCallback(() => {
    queryClient.clear();
    segment.reset();
    navigate(ROUTES.AUTH_LOGIN);
    signOut();
  }, [navigate, queryClient, segment, signOut]);

  const redirectTo = useCallback(
    ({
      url,
      redirectURL,
      origin,
      anonymousId,
    }: {
      url: string;
      redirectURL?: string;
      origin?: string;
      anonymousId?: string | null;
    }) => {
      const finalURL = new URL(url, window.location.origin);

      if (redirectURL) {
        finalURL.searchParams.append('redirect_url', redirectURL);
      }

      if (origin) {
        finalURL.searchParams.append('origin', origin);
      }

      if (anonymousId) {
        finalURL.searchParams.append('anonymous_id', anonymousId);
      }

      // Note: Do not use react-router-dom. The version we have doesn't do instant cross origin redirects.
      window.location.replace(finalURL.href);
    },
    []
  );

  const redirectToLogin = useCallback(
    ({ redirectURL }: { redirectURL?: string } = {}) => redirectTo({ url: ROUTES.AUTH_LOGIN, redirectURL }),
    [redirectTo]
  );

  const redirectToSignUp = useCallback(
    ({
      redirectURL,
      origin,
      anonymousId,
    }: { redirectURL?: string; origin?: string; anonymousId?: string | null } = {}) =>
      redirectTo({ url: ROUTES.AUTH_SIGNUP, redirectURL, origin, anonymousId }),
    [redirectTo]
  );

  const switchOrgCallback = useCallback(async () => {
    await queryClient.refetchQueries();
  }, [queryClient]);

  const getOrganizations = useCallback(() => {
    if (userMemberships && userMemberships.data) {
      return userMemberships.data.map((membership) => toOrganizationEntity(membership.organization));
    }

    return [];
  }, [userMemberships]);

  const reloadOrganization = useCallback(async () => {
    await clerkOrganization?.reload();
  }, [clerkOrganization]);

  // check if user has active organization
  useEffect(() => {
    if (orgId) {
      return;
    }

    if (isOrgListLoaded && clerkUser) {
      const hasOrgs = clerkUser.organizationMemberships.length > 0;

      if (hasOrgs) {
        const firstOrg = clerkUser.organizationMemberships[0].organization;
        setActive({ organization: firstOrg });
      } else {
        navigate(ROUTES.AUTH_SIGNUP_ORGANIZATION_LIST);
      }
    }
  }, [navigate, setActive, isOrgListLoaded, clerkUser, orgId]);

  // transform Clerk user to internal user entity
  useEffect(() => {
    if (isUserLoaded && clerkUser) {
      setUser(toUserEntity(clerkUser));
    }
  }, [clerkUser, isUserLoaded]);

  // transform Clerk organization to internal organization entity
  useEffect(() => {
    if (isOrganizationLoaded && clerkOrganization) {
      setOrganization(toOrganizationEntity(clerkOrganization));
    }
  }, [clerkOrganization, isOrganizationLoaded]);

  // get all user organizations at once (mirrors unpaginaged community impl., page = 10 orgs)
  useEffect(() => {
    if (userMemberships && userMemberships.hasNextPage) {
      userMemberships.fetchNext();
    }
  }, [userMemberships]);

  // refetch queries on organization switch
  useEffect(() => {
    if (organization && organization._id !== clerkOrganization?.id) {
      switchOrgCallback();
    }
  }, [organization, clerkOrganization, switchOrgCallback]);

  // sentry tracking
  useEffect(() => {
    if (user && organization) {
      segment.identify(user);

      setSentryUser({
        email: user.email ?? '',
        username: `${user.firstName} ${user.lastName}`,
        id: user._id,
        organizationId: organization._id,
        organizationName: organization.name,
      });
    } else {
      configureScope((scope) => scope.setUser(null));
    }
  }, [user, organization, segment]);

  // launch darkly
  useEffect(() => {
    if (!ldClient) return;

    if (organization) {
      ldClient.identify({
        kind: 'organization',
        key: organization._id,
        name: organization.name,
      });
    } else {
      ldClient.identify({
        kind: 'user',
        anonymous: true,
      });
    }
  }, [ldClient, organization]);

  return {
    inPublicRoute,
    inPrivateRoute,
    isLoading: inPrivateRoute && (!isUserLoaded || !isOrganizationLoaded),
    currentUser: user,
    organizations: getOrganizations(),
    currentOrganization: organization,
    reloadOrganization,
    logout,
    login: (...args: any[]) => {},
    // TODO: implement proper environment switch
    environmentId: undefined,
    organizationId: organization?._id,
    redirectToLogin,
    redirectToSignUp,
  };
}
