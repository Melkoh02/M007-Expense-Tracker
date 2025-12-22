/**
 * Composes a Date object from a calendar date and a time string.
 *
 * - `date` is treated as a calendar day (its existing time is ignored)
 * - `time` must be in "HH:mm" format
 * - Composition is done in the user's local timezone
 *
 * @returns Date in local time, or undefined if neither date nor time is provided
 */
export function composeDateTime(date?: Date, time?: string): Date | undefined {
  if (!date && !time) return undefined;

  const base = date ? new Date(date) : new Date();

  const [hours, minutes] = (time ?? '00:00').split(':').map(v => Number(v));

  base.setHours(hours || 0, minutes || 0, 0, 0);

  return base;
}
