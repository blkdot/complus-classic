import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useComplus from '../../hooks/useComplus'

import { bnToDec } from '../../utils'
import { getSudoSuContract, getEarned } from '../../complus/utils'
import { getFarms } from '../../complus/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const complus = useComplus()
  const { account } = useWallet()

  const farms = getFarms(complus)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
