import React from 'react'
import styled from 'styled-components'

interface CardIconProps {
  children?: React.ReactNode,
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon>
    {children}
  </StyledCardIcon>
)

const StyledCardIcon = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 60px;
  height: 110px;
  width: 110px;
  border-radius: 90px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto 16px;
  padding: 30px;
`

export default CardIcon
