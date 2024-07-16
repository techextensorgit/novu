import { Flex } from '@novu/novui/jsx';
import { css } from '@novu/novui/css';

export function WorkflowBackgroundWrapper({ children }) {
  return (
    <Flex
      // TODO fix this
      h="[95%]"
      justifyContent="center"
      className={css({
        // FIXME: popover token isn't correct. Also, ideally there should be a better way to use a token here
        backgroundImage: '[radial-gradient(var(--nv-colors-workflow-background-dots) 1.5px, transparent 0)]',
        backgroundSize: '[16px 16px]',
        p: '375',
        mx: '-150',
      })}
    >
      {children}
    </Flex>
  );
}
