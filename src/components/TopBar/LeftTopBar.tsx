import React, {useMemo, useState} from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import Nav from './components/Nav'

// added by @skyhdev
import { RowBetween } from '../Dex/Row'

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    margin-top: 0.5rem;
  }
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;
  text-decoration-style: unset;

  :hover {
    cursor: pointer;
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-end;
  }
`

interface LeftTopBarProps {
  onPresentMobileMenu: () => void
}

const LeftTopBar: React.FC<LeftTopBarProps> = ({ onPresentMobileMenu }) => {
  
  return (
    <StyledNavWrapper>
      <StyledLogoWrapper>
        <Logo />
      </StyledLogoWrapper>
      <Nav />
    </StyledNavWrapper>
  )
}

const StyledLogoWrapper = styled.div`
  width: 90px;
  margin-right: 113px;
  @media (max-width: 400px) {

    width: auto;
  }
`

const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  @media (max-width: 400px) {
    display: none;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 48px;
    justify-content: center;
    width: 48px;
  }
`

export default LeftTopBar
