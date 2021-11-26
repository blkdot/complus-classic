import {useCallback} from 'react'

import useComplus from './useComplus'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getComplusContract,
  getComPlusTokenContract
} from '../complus/utils'

const useComPlusTokenApprove = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const complus = useComplus()
  const lpContract = getComplusContract(complus)
  const contract = getComPlusTokenContract(complus)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useComPlusTokenApprove
