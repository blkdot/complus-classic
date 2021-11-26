import React from 'react'
import styled from 'styled-components'

interface CardTitleProps {
  text?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
  <StyledCardTitle>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  padding: 24px;
  text-align: center;
`

export default CardTitle
