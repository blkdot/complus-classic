import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: rgba(252,252,252,0.9);
  //background: #fafafa;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
