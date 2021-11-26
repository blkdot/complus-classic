import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useComplus from '../../hooks/useComplus'
import {getContract} from '../../utils/arc20'
import InComPlusToken from "./components/InComPlusToken";
import OutComPlusToken from './components/OutComPlusToken'
import {contractAddresses} from '../../complus/lib/constants'
import {getComPlusTokenSupply} from "../../complus/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";

const ComPlusTokenBacked: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.comPlusToken[43114],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const complus = useComplus()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getComPlusTokenSupply(complus)
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
            <OutComPlusToken
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <InComPlusToken/>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
        <StyledInfo>
          COM+ is the Complus Network's main bridge token. It is 1: 1 equivalent to COM.
        </StyledInfo>
        <Spacer size="md" />
        <StyledLink
          target="__blank"
          //href={`https://info.complus.network/pair/${lpTokenAddress}`}
          href={`https://snowtrace.io/address/0xc5B25a5BEd03bB7c9030Dfe5Be56f21f5c3fCB1B#code`}
        >
          COM+ Contract
        </StyledLink>
          </StyledCardWrapper>
        </StyledCardsWrapper>
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

const StyledLink = styled.a`
  color: #b22234;
  padding-left: 18px;
  padding-right: 18px;
  text-decoration: none;
  text-align: center;
  &:hover {
    color: #666;
  }
`

export default ComPlusTokenBacked
