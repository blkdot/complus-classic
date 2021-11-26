import { useCallback } from 'react'

import useComplus from './useComplus'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getSudoSuContract } from '../complus/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const complus = useComplus()
  const sudoSuContract = getSudoSuContract(complus)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sudoSuContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, sudoSuContract])

  return { onApprove: handleApprove }
}

export default useApprove
