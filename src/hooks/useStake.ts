import { useCallback } from 'react'

import useComplus from './useComplus'
import { useWallet } from 'use-wallet'

import { stake, getSudoSuContract } from '../complus/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const complus = useComplus()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getSudoSuContract(complus),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, complus],
  )

  return { onStake: handleStake }
}

export default useStake
