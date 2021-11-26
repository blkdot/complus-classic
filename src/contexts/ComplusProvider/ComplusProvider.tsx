import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Complus } from '../../complus'

export interface ComplusContext {
  complus?: typeof Complus
}

export const Context = createContext<ComplusContext>({
  complus: undefined,
})

declare global {
  interface Window {
    complussauce: any
  }
}

const ComplusProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [complus, setComplus] = useState<any>()

  // @ts-ignore
  window.complus = complus
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const complusLib = new Complus(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setComplus(complusLib)
      window.complussauce = complusLib
    }
  }, [ethereum])

  return <Context.Provider value={{ complus }}>{children}</Context.Provider>
}

export default ComplusProvider
