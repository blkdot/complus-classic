import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getSudoSuContract,
  getFarms,
  getComPlusTokenContract,
  getTotalLPPeggedComValue,
} from '../complus/utils'
import useComplus from './useComplus'
import useBlock from './useBlock'

export interface StakedPeggedComValue {
  tokenAmount: BigNumber
  peggedComAmount: BigNumber
  totalPeggedComValue: BigNumber
  tokenPriceInPeggedCom: BigNumber
  poolWeight: BigNumber
}

const usePeggedComStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedPeggedComValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const complus = useComplus()
  const farms = getFarms(complus)
  const sudoSuContract = getSudoSuContract(complus)
  const peggedComContact = getComPlusTokenContract(complus)  
  const block = useBlock()

  const fetchPeggedComStakedValue = useCallback(async () => {
    const balances: Array<StakedPeggedComValue> = await Promise.all(
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
          getTotalLPPeggedComValue(
            sudoSuContract,
            peggedComContact,
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
      fetchPeggedComStakedValue()
    }
  }, [account, block, sudoSuContract, setBalance, complus])

  return balances
}

export default usePeggedComStakedValue
