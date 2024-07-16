import { Show } from 'solid-js';
import { useStyle } from '../../../helpers';
import { BellIcon } from '../../../icons';

type DefaultBellContainerProps = {
  unreadCount: number;
};

export const BellContainer = (props: DefaultBellContainerProps) => {
  const style = useStyle();

  return (
    <span
      class={style(
        'bellContainer',
        `nt-h-6 nt-w-6 nt-flex nt-justify-center nt-items-center nt-rounded-md nt-relative nt-text-foreground-alpha-600 nt-cursor-pointer`
      )}
    >
      <BellIcon />
      <Show when={props.unreadCount > 0}>
        {/* <span
          class="nt-absolute nt-top-2 nt-right-2 nt-block nt-w-2 nt-h-2 nt-transform nt-translate-x-1/2
        -nt-translate-y-1/2 nt-bg-primary nt-rounded-full"
        /> */}
      </Show>
    </span>
  );
};
