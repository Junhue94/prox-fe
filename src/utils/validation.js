import { has } from 'lodash';

export const setFormHelperText = (errors, key) => {
  const hasMessage = has(errors, `${key}.message`);
  if (hasMessage) {
    return errors[key].message;
  }
  return '';
};