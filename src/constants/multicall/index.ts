import { ChainId } from '@complus/sdk-ava'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xa00FB557AA68d2e98A830642DBbFA534E8512E5f',
  [ChainId.TESTNET]: '0xa00FB557AA68d2e98A830642DBbFA534E8512E5f',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
