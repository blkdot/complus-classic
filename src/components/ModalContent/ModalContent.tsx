import React from 'react'
import styled from 'styled-components'

const ModalContent: React.FC = ({ children }) => {
  return <StyledModalContent>{children}</StyledModalContent>
}

const StyledModalContent = styled.div`
  padding: 18px;
  @media (max-width: 480px) {
    flex: 1;
    overflow: auto;
  }
`

export default ModalContent
