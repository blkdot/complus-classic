import { useCallback } from 'react'

import useComplus from './useComplus'
import { useWallet } from 'use-wallet'

import { harvest, getSudoSuContract } from '../complus/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const complus = useComplus()
  const sudoSuContract = getSudoSuContract(complus)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(sudoSuContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, complus])

  return { onReward: handleReward }
}

export default useReward
