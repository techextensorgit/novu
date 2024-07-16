import { useStyle } from '../../helpers';
import { ArrowDropDown } from '../../icons';

export const LoadingScreen = () => {
  return Array.from({ length: 8 }).map(() => <LoadingSkeleton />);
};

const LoadingSkeleton = () => {
  const style = useStyle();

  return (
    <div
      class={style(
        'settingsLoadingContainer',
        'nt-p-4 nt-flex nt-gap-1 nt-items-center nt-self-stretch nt-animate-pulse'
      )}
    >
      <div class={style('settingsLoadingSkeletonContainer', 'nt-flex nt-flex-col nt-self-stretch nt-gap-1 nt-flex-1')}>
        <div class={style('settingsLoadingSkeleton', 'nt-w-1/3 nt-h-3 nt-rounded nt-bg-foreground-alpha-300')} />
        <div class={style('settingsLoadingSkeleton', 'nt-w-3/4 nt-h-3 nt-rounded nt-bg-foreground-alpha-300')} />
      </div>
      <div>
        <ArrowDropDown />
      </div>
    </div>
  );
};
