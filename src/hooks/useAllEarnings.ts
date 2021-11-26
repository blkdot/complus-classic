import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getSudoSuContract, getFarms } from '../complus/utils'
import useComplus from './useComplus'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const complus = useComplus()
  const farms = getFarms(complus)
  const sudoSuContract = getSudoSuContract(complus)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(sudoSuContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, sudoSuContract, complus])

  useEffect(() => {
    if (account && sudoSuContract && complus) {
      fetchAllBalances()
    }
  }, [account, block, sudoSuContract, setBalance, complus])

  return balances
}

export default useAllEarnings
