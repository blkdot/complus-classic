import React from 'react'
import styled, { keyframes } from 'styled-components'

import CardIcon from '../CardIcon'
import omur from '../../assets/img/complus.svg'

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>
      <CardIcon>
        <StyledComplus><img src={omur} height={48} alt="Complus Network" /></StyledComplus>
      </CardIcon>
      {!!text && <StyledText>{text}</StyledText>}
    </StyledLoader>
  )
}

const pulse = keyframes`
  0% {
    transform: scale(1,1);
  }
  50% {
    transform: scale(1.2,1.2);
  }
  100% {
    transform: scale(1,1);
  }
`

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledComplus = styled.div`
  position: relative;
  animation: 3s ${pulse} infinite;
`

const StyledText = styled.div`
  color: #666;
`

export default Loader
