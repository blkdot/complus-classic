import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">Home</StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">FARM</StyledLink>
      <StyledLink exact activeClassName="active" to="/staking">STAKE</StyledLink>
      <StyledLink exact activeClassName="active" to="/peggedCom">COM+</StyledLink>
      <StyledAbsoluteLink href="https://complusbridge.com" target="_blank">Bridge</StyledAbsoluteLink>
      <StyledAbsoluteLink href="https://avagraph.live" target="_blank">Analytics</StyledAbsoluteLink>
      <StyledAbsoluteLink href="https://avadex.complus.exchange" target="_blank">DEX</StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: #111;
  font-weight: 400;
  font-size: 18px;
  padding-left: 9px;
  padding-right: 9px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: #b22234;
  }
  &.active {
    color: #b22234;
  }
  @media (max-width: 400px) {
    padding-left: 9px;
    padding-right: 9px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: #111;
  font-weight: 400;
  font-size: 18px;
  padding-left: 9px;
  padding-right: 9px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: #b22234;
  }
  &.active {
    color: #b22234;
  }
  @media (max-width: 400px) {
    padding-left: 9px;
    padding-right: 9px;
  }
`

export default Nav
