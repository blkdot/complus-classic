import {useCallback} from 'react'

import useComplus from './useComplus'
import {useWallet} from 'use-wallet'

import {leave, getXComStakingContract} from '../complus/utils'

const useLeave = () => {
  const {account} = useWallet()
  const complus = useComplus()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXComStakingContract(complus),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, complus],
  )

  return {onLeave: handle}
}

export default useLeave
