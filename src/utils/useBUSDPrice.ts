import { ChainId, Currency, currencyEquals, JSBI, Price, WAVAX } from '@complus/sdk-ava'
import { useMemo } from 'react'
import { AUSD } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { useActiveWeb3React } from '../hooks'
import { wrappedCurrency } from './wrappedCurrency'

/**
 * Returns the price in AUSD of the input currency
 * @param currency currency to compute the AUSD price of
 */
export default function useAUSDPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WAVAX[chainId], wrapped) ? undefined : currency,
        chainId ? WAVAX[chainId] : undefined
      ],
      [wrapped?.equals(AUSD) ? undefined : wrapped, chainId === ChainId.MAINNET ? AUSD : undefined],
      [chainId ? WAVAX[chainId] : undefined, chainId === ChainId.MAINNET ? AUSD : undefined]
    ],
    [chainId, currency, wrapped]
  )
  const [[ethPairState, ethPair], [ausdPairState, ausdPair], [ausdEthPairState, ausdEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle wavax/eth
    if (wrapped.equals(WAVAX[chainId])) {
      if (ausdPair) {
        const price = ausdPair.priceOf(WAVAX[chainId])
        return new Price(currency, AUSD, price.denominator, price.numerator)
      } else {
        return undefined
      }
    }
    // handle ausd
    if (wrapped.equals(AUSD)) {
      return new Price(AUSD, AUSD, '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(WAVAX[chainId])
    const ethPairETHAUSDValue: JSBI =
      ethPairETHAmount && ausdEthPair ? ausdEthPair.priceOf(WAVAX[chainId]).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the ausd pair
    if (ausdPairState === PairState.EXISTS && ausdPair && ausdPair.reserveOf(AUSD).greaterThan(ethPairETHAUSDValue)) {
      const price = ausdPair.priceOf(wrapped)
      return new Price(currency, AUSD, price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && ausdEthPairState === PairState.EXISTS && ausdEthPair) {
      if (ausdEthPair.reserveOf(AUSD).greaterThan('0') && ethPair.reserveOf(WAVAX[chainId]).greaterThan('0')) {
        const ethAusdPrice = ausdEthPair.priceOf(AUSD)
        const currencyEthPrice = ethPair.priceOf(WAVAX[chainId])
        const ausdPrice = ethAusdPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, AUSD, ausdPrice.denominator, ausdPrice.numerator)
      }
    }
    return undefined
  }, [chainId, currency, ethPair, ethPairState, ausdEthPair, ausdEthPairState, ausdPair, ausdPairState, wrapped])
}
