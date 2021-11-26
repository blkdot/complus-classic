import {useCallback, useEffect, useState} from 'react'

import BigNumber from 'bignumber.js'
import useComplus from './useComplus'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {Contract} from 'web3-eth-contract'

import {getAllowance} from '../utils/arc20'
import {getComplusContract, getComPlusTokenContract} from '../complus/utils'

const useComPlusTokenAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const {account}: { account: string; ethereum: provider } = useWallet()
  const complus = useComplus()
  const lpContract = getComplusContract(complus)
  const comPlusPeggedContract = getComPlusTokenContract(complus)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      comPlusPeggedContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, comPlusPeggedContract, lpContract])

  useEffect(() => {
    if (account && comPlusPeggedContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, comPlusPeggedContract, lpContract])

  return allowance
}

export default useComPlusTokenAllowance
