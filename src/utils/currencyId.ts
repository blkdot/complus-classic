import { Currency, ETHER, Token } from '@complus/sdk-ava'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'AVAX'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
