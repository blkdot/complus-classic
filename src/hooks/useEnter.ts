import {useCallback} from 'react'

import useComplus from './useComplus'
import {useWallet} from 'use-wallet'

import {enter, getXComStakingContract} from '../complus/utils'

const useEnter = () => {
  const {account} = useWallet()
  const complus = useComplus()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXComStakingContract(complus),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, complus],
  )

  return {onEnter: handle}
}

export default useEnter
