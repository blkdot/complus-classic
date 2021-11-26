import React from 'react'
import styled from 'styled-components'
import PoweredBy from '../../../assets/img/poweredby.png'

const Nav: React.FC = () => {
  return (
    <StyledDiv>
      <StyledNav>
        <StyledLink target="_blank" href="https://complus.network/litepaper.pdf">Litepaper</StyledLink>
        <StyledLink target="_blank" href="https://twitter.com/complusnetwork">Twitter</StyledLink>
        <StyledLink target="_blank" href="https://t.me/complus_group">Telegram</StyledLink>
        <StyledLink target="_blank" href="https://complusnetwork.medium.com/">Medium</StyledLink>
        <StyledLink target="_blank" href="https://github.com/complusnetwork">Github</StyledLink>
      </StyledNav>
      <StyledNav>
        <StyledChain target="_blank" href="https://docs.avax.network">
          <img height="27" src={PoweredBy} alt="Powered by Avalanche" />
        </StyledChain>
      </StyledNav>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 100%;
  text-align: center;
  }
`

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

`

const StyledLink = styled.a`
  color: #666;
  padding: 6px 12px;
  text-decoration: none;
  &:hover {
    color: #b22234;
  }
  &:focus {
    color: #b22234;
  }
`

const StyledChain = styled.a`
  text-decoration: none;
  &:hover {
  text-decoration: none;
  }
  &:focus {
  text-decoration: none;
  }
`
export default Nav
