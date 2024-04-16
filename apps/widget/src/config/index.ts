import { isBrowser } from '@novu/shared';
import { getContextPath, NovuComponentEnum } from '@novu/shared';

export const API_URL =
  isBrowser() && (window as any).Cypress
    ? window._env_.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'http://185.100.212.51:1336'
    : window._env_.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'http://185.100.212.51:3000';
export const WS_URL =
  isBrowser() && (window as any).Cypress
    ? window._env_.REACT_APP_WS_URL || process.env.REACT_APP_WS_URL || 'http://185.100.212.51:1340'
    : window._env_.REACT_APP_WS_URL || process.env.REACT_APP_WS_URL || 'http://185.100.212.51:3002';

export const CONTEXT_PATH = getContextPath(NovuComponentEnum.WIDGET);
