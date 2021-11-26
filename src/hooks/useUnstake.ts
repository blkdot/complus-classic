import { useCallback } from 'react'

import useComplus from './useComplus'
import { useWallet } from 'use-wallet'

import { unstake, getSudoSuContract } from '../complus/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const complus = useComplus()
  const sudoSuContract = getSudoSuContract(complus)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(sudoSuContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, complus],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
