import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import omur from '../../assets/img/complus.svg'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={omur} height={60} alt="Complus Network" />}
        title="COMPLUS"
        subtitle="NETWORK"
      />

      <StyledInfo>
        Complus Network is an (AMM) decentralized crypto exchange (DEX) and yield farming protocol on Avalanche.
        <br/><br/>The Exchange allows users to swap any ARC20 token into any other ARC20 token through automated liquidity pools. The Farm allows users to yield farm $COM rewards with each new block based on staking COM-LP tokens they received from exchange. 
      </StyledInfo>
      <Spacer size="lg" />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="Go to Farms" to="/farms" variant="secondary" />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  text-align: center;
  color: #666;
  font-size: 14px;
  font-weight: 400;
  margin: 0 24px;
  padding: 0;
  max-width: 900px;

  > b {
    color: #333;
  }
  > hr {
    border-top: 1px dashed #ccc
  }
`

export default Home
