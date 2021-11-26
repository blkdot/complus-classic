import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import omur from '../../assets/img/complus.svg'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={omur} height="34" alt="Complus Network" />
      <StyledText>
        COMPLUS
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 34px;
  min-width: auto;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  font-family: 'Hammersmith One', sans-serif;
  color: #333;
  font-size: 34px;
  font-weight: 400;
  letter-spacing: -0.03rem;
  margin-top: 4px;
  margin-left: 9px;
  @media (max-width: 600px) {
    display: none;
  }
`

export default Logo
