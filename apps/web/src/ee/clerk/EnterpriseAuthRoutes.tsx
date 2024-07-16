import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate, Route } from 'react-router-dom';
import { PublicPageLayout } from '../../components/layout/components/PublicPageLayout';
import { ROUTES } from '../../constants/routes';
import OrganizationListPage from './pages/OrganizationListPage';
import QuestionnairePage from './pages/QuestionnairePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

export const EnterpriseAuthRoutes = () => {
  const EnterprisePublicAuthLayout = () => (
    <SignedOut>
      <PublicPageLayout />
    </SignedOut>
  );

  // private but we want appearance of public layout
  const EnterprisePrivateAuthLayout = () => (
    <>
      <SignedIn>
        <PublicPageLayout />
      </SignedIn>
      <SignedOut>
        <Navigate to={ROUTES.AUTH_LOGIN} replace />
      </SignedOut>
    </>
  );

  return (
    <>
      <Route element={<EnterprisePublicAuthLayout />}>
        <Route path={ROUTES.AUTH_SIGNUP + '/*'} element={<SignUpPage />} />
        <Route path={ROUTES.AUTH_LOGIN + '/*'} element={<SignInPage />} />
      </Route>
      <Route element={<EnterprisePrivateAuthLayout />}>
        <Route path={ROUTES.AUTH_SIGNUP_ORGANIZATION_LIST} element={<OrganizationListPage />} />
        <Route path={ROUTES.AUTH_APPLICATION} element={<QuestionnairePage />} />
      </Route>
    </>
  );
};
