/** Remove os caracteres especiais e deixa apenas
 * o texto base
 */
export function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
