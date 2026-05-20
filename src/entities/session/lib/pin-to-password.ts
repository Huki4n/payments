/** Бэкенд требует пароль 8–100 символов; PIN из 4 цифр дублируется в 8-символьную строку. */
export function pinToPassword(pin: string): string {
  return `${pin}${pin}`
}
