import { LogState } from './log';

const selectLogItems = (state: LogState) => state.items;

export default {
  selectLogItems
};
