import {useCallback} from 'react'

import useComplus from './useComplus'
import {useWallet} from 'use-wallet'

import {enter, getComPlusTokenContract} from '../complus/utils'

const useComPlusTokenEnter = () => {
  const {account} = useWallet()
  const complus = useComplus()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getComPlusTokenContract(complus),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, complus],
  )

  return {onEnter: handle}
}

export default useComPlusTokenEnter
