import { Interface } from '@ethersproject/abi'
import { ChainId } from '@complus/sdk-ava'
import V1_EXCHANGE_ABI from './v1_exchange.json'
import V1_FACTORY_ABI from './v1_factory.json'

const V1_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x5997928f2A7004fc8Aa9F2561d71FB9B103E1e1f',
  [ChainId.TESTNET]: '0x5997928f2A7004fc8Aa9F2561d71FB9B103E1e1f'
}

const V1_FACTORY_INTERFACE = new Interface(V1_FACTORY_ABI)
const V1_EXCHANGE_INTERFACE = new Interface(V1_EXCHANGE_ABI)

export { V1_FACTORY_ADDRESSES, V1_FACTORY_INTERFACE, V1_FACTORY_ABI, V1_EXCHANGE_INTERFACE, V1_EXCHANGE_ABI }
