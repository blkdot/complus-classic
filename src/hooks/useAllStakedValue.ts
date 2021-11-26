import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getSudoSuContract,
  getWavaxContract,
  getFarms,
  getTotalLPWavaxValue,
} from '../complus/utils'
import useComplus from './useComplus'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wavaxAmount: BigNumber
  totalWavaxValue: BigNumber
  tokenPriceInWavax: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const complus = useComplus()
  const farms = getFarms(complus)
  const sudoSuContract = getSudoSuContract(complus)
  const wavaxContact = getWavaxContract(complus)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWavaxValue(
            sudoSuContract,
            wavaxContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, sudoSuContract, complus])

  useEffect(() => {
    if (account && sudoSuContract && complus) {
      fetchAllStakedValue()
    }
  }, [account, block, sudoSuContract, setBalance, complus])

  return balances
}

export default useAllStakedValue
