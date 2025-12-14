type SanitizeMode = 'number' | 'amount';

export function sanitizeNumericInput(
  text: string,
  {
    allowDecimal = true,
    mode = 'number',
  }: {allowDecimal?: boolean; mode?: SanitizeMode} = {},
) {
  /**
   * number:
   *  - digits + dot
   *  - no commas
   *
   * amount:
   *  - digits + dot + commas while typing
   * Final cleanup still removes commas before storing.
   */
  let s =
    mode === 'amount'
      ? text.replace(/[^\d.,]/g, '')
      : text.replace(/[^\d.]/g, '');

  // normalize commas -> nothing (storage is always raw)
  s = s.replace(/,/g, '');

  if (!allowDecimal) {
    return s.replace(/\./g, '');
  }

  // allow only one dot
  const firstDot = s.indexOf('.');
  if (firstDot !== -1) {
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, '');
  }

  return s;
}
