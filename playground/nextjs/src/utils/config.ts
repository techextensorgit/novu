export const novuConfig = {
  applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_APP_ID ?? '',
  subscriberId: process.env.NEXT_PUBLIC_NOVU_SUBSCRIBER_ID ?? '',
  backendUrl: process.env.NEXT_PUBLIC_NOVU_BACKEND_URL ?? 'http://37.60.242.154:3000',
  socketUrl: process.env.NEXT_PUBLIC_NOVU_SOCKET_URL ?? 'http://37.60.242.154:3002',
};
