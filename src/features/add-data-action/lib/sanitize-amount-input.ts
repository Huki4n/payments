/** Только цифры и не более одной точки с дробной частью (до 5 знаков после неё). */
export function sanitizeAmountInput(raw: string): string {
  return (raw.replace(/[^\d.]/g, '').match(/^\d*(?:\.\d{0,5})?/) ?? [''])[0]
}
