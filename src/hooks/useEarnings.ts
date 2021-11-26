import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getSudoSuContract } from '../complus/utils'
import useComplus from './useComplus'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const complus = useComplus()
  const sudoSuContract = getSudoSuContract(complus)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(sudoSuContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, sudoSuContract, complus])

  useEffect(() => {
    if (account && sudoSuContract && complus) {
      fetchBalance()
    }
  }, [account, block, sudoSuContract, setBalance, complus])

  return balance
}

export default useEarnings
