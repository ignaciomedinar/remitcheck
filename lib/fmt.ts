/**
 * Formatea un número al estilo es-ES sin depender del soporte de locale del entorno.
 * Punto como separador de miles, coma como separador decimal.
 * Ejemplo: fmtNum(1234567.8, 2) → "1.234.567,80"
 */
export function fmtNum(n: number, decimals = 2): string {
  const fixed = n.toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const intWithDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decimals > 0 ? `${intWithDots},${dec}` : intWithDots;
}
