export const passwordMinValidator = (value) =>
  value.length >= 8 ? null : 'Пароль должен иметь не меньше 8 символов.'
