/**
 * Returns up to 2 uppercase initials from a string.
 *
 * Rules:
 * - Trims whitespace
 * - If multiple words → first letter of first 2 words ("Debit Card" → "DC")
 * - If single word → first 2 letters ("Cash" → "CA", "A" → "A")
 * - If empty / falsy → "?"
 */
export const getInitials = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '?';

  const parts = trimmed.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
  }

  const word = parts[0];
  return word.slice(0, Math.min(2, word.length)).toUpperCase();
};
