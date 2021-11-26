import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 39px;
  padding-top: 60px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 60px;
  height: 60px;
  width: auto;
  line-height: 60px;
  text-align: center;
  padding: 3px;
`

const StyledTitle = styled.span`
  font-family: 'Hammersmith One', sans-serif;
  color: #000;
  font-size: 34px;
  font-weight: 300;
  letter-spacing: 0.01em;
  text-align: center;
  text-transform: uppercase;
  margin-top: 12px;
  padding: 0;
`

const StyledSubtitle = styled.span`
  color: #393939;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
  margin-top: -9px;
  padding: 0;
`

export default PageHeader
