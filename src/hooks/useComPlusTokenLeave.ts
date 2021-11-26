import {useCallback} from 'react'

import useComplus from './useComplus'
import {useWallet} from 'use-wallet'

import {leave, getComPlusTokenContract} from '../complus/utils'

const useComPlusTokenLeave = () => {
  const {account} = useWallet()
  const complus = useComplus()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getComPlusTokenContract(complus),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, complus],
  )

  return {onLeave: handle}
}

export default useComPlusTokenLeave
