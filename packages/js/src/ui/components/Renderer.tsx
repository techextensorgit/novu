import { onCleanup, onMount } from 'solid-js';
import { MountableElement, Portal } from 'solid-js/web';
import { NovuUI } from '..';
import { NovuOptions } from '../../novu';
import {
  Appearance,
  AppearanceProvider,
  FocusManagerProvider,
  InboxNotificationStatusProvider,
  Localization,
  LocalizationProvider,
  NovuProvider,
} from '../context';
import { Bell, Root } from './elements';
import { Inbox } from './Inbox';

const NovuComponents = {
  Inbox,
  Bell,
};

export type NovuComponent = { name: NovuComponentName; props?: unknown };

export type NovuMounterProps = NovuComponent & { element: MountableElement };

export type NovuComponentName = keyof typeof NovuComponents;

export type NovuComponentControls = {
  mount: (params: NovuMounterProps) => void;
  unmount: (params: { element: MountableElement }) => void;
  updateProps: (params: { element: MountableElement; props: unknown }) => void;
};

type RendererProps = {
  novuUI: NovuUI;
  defaultCss: string;
  appearance?: Appearance;
  nodes: Map<MountableElement, NovuComponent>;
  localization?: Localization;
  options: NovuOptions;
};

export const Renderer = (props: RendererProps) => {
  onMount(() => {
    const id = 'novu-default-css';
    const el = document.getElementById(id);
    if (el) {
      return;
    }

    const styleEl = document.createElement('style');
    styleEl.id = id;
    document.head.insertBefore(styleEl, document.head.firstChild);
    styleEl.innerHTML = props.defaultCss;

    onCleanup(() => {
      const element = document.getElementById(id);
      element?.remove();
    });
  });

  return (
    <NovuProvider options={props.options}>
      <LocalizationProvider localization={props.localization}>
        <AppearanceProvider id={props.novuUI.id} appearance={props.appearance}>
          <FocusManagerProvider>
            <InboxNotificationStatusProvider>
              {[...props.nodes].map(([node, component]) => (
                <Portal mount={node}>
                  <Root>{NovuComponents[component.name](component.props || {})}</Root>
                </Portal>
              ))}
            </InboxNotificationStatusProvider>
          </FocusManagerProvider>
        </AppearanceProvider>
      </LocalizationProvider>
    </NovuProvider>
  );
};
