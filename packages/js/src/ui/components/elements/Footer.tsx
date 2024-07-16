/* eslint-disable local-rules/no-class-without-style */
import { Novu } from '../../icons';

export const Footer = () => {
  return (
    <div class="nt-flex nt-justify-center nt-items-center nt-gap-1 nt-mt-auto nt-py-3 nt-text-foreground-alpha-200">
      <Novu />
      <span class="nt-text-xs">Powered by Novu</span>
    </div>
  );
};
