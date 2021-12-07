import { Interface } from '@ethersproject/abi'
import ARC20_ABI from './arc20.json'
import ARC20_BYTES32_ABI from './arc20_bytes32.json'

const ARC20_INTERFACE = new Interface(ARC20_ABI)

const ARC20_BYTES32_INTERFACE = new Interface(ARC20_BYTES32_ABI)

export default ARC20_INTERFACE
export { ARC20_ABI, ARC20_BYTES32_INTERFACE, ARC20_BYTES32_ABI }
