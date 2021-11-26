import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getSudoSuContract } from '../complus/utils'
import useComplus from './useComplus'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const complus = useComplus()
  const sudoSuContract = getSudoSuContract(complus)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(sudoSuContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, complus])

  useEffect(() => {
    if (account && complus) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, complus])

  return balance
}

export default useStakedBalance
