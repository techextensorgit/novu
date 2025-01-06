import { isBrowser, getContextPath, NovuComponentEnum } from '@novu/shared';

export const API_URL =
  isBrowser() && (window as any).Cypress
    ? window._env_.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'http://37.60.242.154:1336'
    : window._env_.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'http://37.60.242.154:3000';
export const WS_URL =
  isBrowser() && (window as any).Cypress
    ? window._env_.REACT_APP_WS_URL || process.env.REACT_APP_WS_URL || 'http://37.60.242.154:1340'
    : window._env_.REACT_APP_WS_URL || process.env.REACT_APP_WS_URL || 'http://37.60.242.154:3002';

export const CONTEXT_PATH = getContextPath(NovuComponentEnum.WIDGET);
