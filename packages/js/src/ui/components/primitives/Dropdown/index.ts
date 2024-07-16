import { Popover } from '../Popover';
import { DropdownContent } from './DropdownContent';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';

export { dropdownContentVariants } from './DropdownContent';
export { dropdownItemVariants } from './DropdownItem';

export const Dropdown = {
  Root: Popover.Root,
  /**
   * Dropdown.Trigger renders a `button` and has no default styling.
   */
  Trigger: DropdownTrigger,
  /**
   * Dropdown.Content renders a `Popover.Content` by default.
   */
  Content: DropdownContent,
  /**
   * Dropdown.Close renders a `Popover.Close` by default.
   */
  Close: Popover.Close,
  /**
   * Dropdown.Item renders a `Popover.Close` with dropdown specific styling.
   * Closes the popover when clicked.
   * `onClick` function is propagated.
   */
  Item: DropdownItem,
};
