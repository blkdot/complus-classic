import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useComplus from './useComplus'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/arc20'
import { getSudoSuContract } from '../complus/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const complus = useComplus()
  const sudoSuContract = getSudoSuContract(complus)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      sudoSuContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, sudoSuContract, lpContract])

  useEffect(() => {
    if (account && sudoSuContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, sudoSuContract, lpContract])

  return allowance
}

export default useAllowance
