const size = {
  xs: '500px',
  sm: '600px',
  md: '900px',
  lg: '1280px',
}
const device = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  md: `(max-width: ${size.md})`,
  lg: `(max-width: ${size.lg})`
}

export default {size, device}