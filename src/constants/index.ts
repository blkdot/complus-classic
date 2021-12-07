import { ChainId, JSBI, Percent, Token, WAVAX } from '@complus/sdk-ava'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, walletconnect } from '../connectors'

export const ROUTER_ADDRESS = '0x78c18E6BE20df11f1f41b9635F3A18B8AD82dDD1'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const AUSD = new Token(ChainId.MAINNET, '0x4FdEA4d744813B23481BE8990A4B7848246c461a', 18, 'AUSD', 'AUSD Token')
export const AETH = new Token(ChainId.MAINNET, '0xa7EC5884a085BF33005C3CE5d55fCBF4c9beDff0', 18, 'AETH', 'AETH Token')
export const ABTC = new Token(ChainId.MAINNET, '0xD6DcD2d875E31cb0AE34b110A992b1b7524A71D9', 18, 'ABTC', 'ABTC Token')
export const COM = new Token(ChainId.MAINNET, '0x3711c397B6c8F7173391361e27e67d72F252cAad', 18, 'COM', 'COMPLUS')

const WAVAX_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WAVAX[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WAVAX[ChainId.TESTNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WAVAX_ONLY,
  [ChainId.MAINNET]: [...WAVAX_ONLY[ChainId.MAINNET], AUSD, AETH, ABTC]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AUSD.address]: [WAVAX[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WAVAX_ONLY,
  [ChainId.MAINNET]: [...WAVAX_ONLY[ChainId.MAINNET], COM]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WAVAX_ONLY,
  [ChainId.MAINNET]: [...WAVAX_ONLY[ChainId.MAINNET], AUSD, AETH, ABTC]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x4FdEA4d744813B23481BE8990A4B7848246c461a', 18, 'AUSD', 'AUSD Token'),
      new Token(ChainId.MAINNET, '0xa7EC5884a085BF33005C3CE5d55fCBF4c9beDff0', 18, 'AETH', 'AETH Token')
    ],
    [AUSD, AETH],
    [AUSD, ABTC]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much AVAX so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 AVAX
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
