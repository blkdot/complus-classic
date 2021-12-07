import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import LeftTopBar from './LeftTopBar'
import RightTopBar from './RightTopBar'

interface TopBarProps {
  onPresentMobileMenu: () => void,
  swap: boolean
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu, swap }) => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <LeftTopBar onPresentMobileMenu={onPresentMobileMenu} />
          <RightTopBar swap={swap} />
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div``

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`

export default TopBar