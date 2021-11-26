import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useComplus from '../../hooks/useComplus'
import {getContract} from '../../utils/arc20'
import UnstakeXComplus from './components/UnstakeXComplus'
import StakeComplus from "./components/StakeComplus";

import {contractAddresses} from '../../complus/lib/constants'
import {getXComSupply} from "../../complus/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";

const StakeXComplus: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xCom[43114],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const complus = useComplus()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXComSupply(complus)
      setTotalSupply(supply)
    }
    if (complus) {
      fetchTotalSupply()
    }
  }, [complus, setTotalSupply])



  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXComplus
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeComplus/>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              You will earn a portion of the swaps fees based on the amount
              of xCOM held relative the weight of the staking. xCOM can be minted
              by staking COM. To redeem COM staked plus swap fees convert xCOM
              back to COM.
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: #666;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXComplus

