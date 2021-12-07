import React, {useState} from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { isMobile } from 'react-device-detect'
import { ChainId } from '@complus/sdk-ava'
import { YellowCard } from '../Dex/Card'

import Settings from '../Dex/Settings'
import Menu from '../Dex/Menu'
import AccountButton from './components/AccountButton'

import Web3Status from '../Dex/Web3Status'

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-end;
  }
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    margin-top: 0.5rem;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ active }) => (!active ? '#FFFFFF' : '#EDEEF2')};
  border-radius: 0.5rem;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  @media (max-width: 500px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`
const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 0.5rem;
  padding: 8px 12px;
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.TESTNET]: 'Testnet'
}

interface RightTopBarProps {
  swap: boolean
}

const RightTopBar: React.FC<RightTopBarProps> = ({ swap }) => {
  const { account, chainId } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  if (swap) {
    return (
      <HeaderControls>
        <HeaderElement>
          <TestnetWrapper>
            {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
          </TestnetWrapper>
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} AVAX
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          {/* <VersionSwitch /> */}
          <Settings />
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    )
  } else {
    return (
      <StyledAccountButtonWrapper>
        <AccountButton />
      </StyledAccountButtonWrapper>
    )
  }
}

export default RightTopBar