import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'

import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'

import usePeggedComStakedValue, {
  StakedPeggedComValue,
} from '../../../hooks/usePeggedComStakedValue'

import useFarms from '../../../hooks/useFarms'
import useComplus from '../../../hooks/useComplus'
import { getEarned, getSudoSuContract } from '../../../complus/utils'
import { bnToDec } from '../../../utils'
import ribbon from '../../../assets/img/icons/ribbon.png'

interface FarmWithStakedValue extends Farm, StakedValue, StakedPeggedComValue {
  apyChainToken: BigNumber,
  apyPeggedCom: BigNumber,
  pwr: BigNumber
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const { account } = useWallet()
  const stakedValue = useAllStakedValue()
  const stakedPeggedComValue = usePeggedComStakedValue()

  const complusIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'COM',
  )
  
  const comPlusTokenIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'COM+',
  )

  const complusChainTokenPrice =
    complusIndex >= 0 && stakedValue[complusIndex]
      ? stakedValue[complusIndex].tokenPriceInWavax
      : new BigNumber(0)

  const complusPeggedComPrice =
    comPlusTokenIndex >= 0 && stakedPeggedComValue[comPlusTokenIndex]
      ? stakedPeggedComValue[comPlusTokenIndex].tokenPriceInPeggedCom
      : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(12088800)
  const COM_PER_BLOCK = new BigNumber(4)
/*
  if (stakedValue[0] != undefined) {
    console.log(stakedValue[0].poolWeight.toString())
    console.log(stakedValue[0].totalWavaxValue.toString())
  }
*/
  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        ...stakedPeggedComValue[i],
        pwr: stakedValue[i]
          ? stakedValue[i].poolWeight
          : null,
        apyChainToken: stakedValue[i]
          ? complusChainTokenPrice
              .times(COM_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              //.times(3)
              .div(stakedValue[i].totalWavaxValue)
          : null,

        apyPeggedCom: stakedPeggedComValue[i]
          ? complusPeggedComPrice
              .times(COM_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              //.div(12)
              .times(stakedPeggedComValue[i].poolWeight)
              .div(stakedPeggedComValue[i].totalPeggedComValue)
          : null,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Loading ..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const complus = useComplus()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (complus) return
      const earned = await getEarned(
        getSudoSuContract(complus),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (complus && account) {
      fetchEarned()
    }
  }, [complus, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'COM'}
      <Card>
        <CardContent>
          <StyledContent>
            {/*<StyledRibbon><img src={ribbon} alt="Ribbon" /></StyledRibbon>*/}
            <StyledCardLogo>{farm.icon}</StyledCardLogo>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.lpToken}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
            </StyledDetails>
            <Spacer />
            <StyledInsight>
              <span>APY</span>
              <span>
              {farm.base === 'chainToken'
		?
                  farm.apyChainToken
                     ? `${farm.apyChainToken
                         .times(new BigNumber(100))
                         .toNumber()
                         .toLocaleString('en-US')
                         .slice(0, -1)} %`
                     : 'Loading ...'
               :
                   farm.apyPeggedCom
                     ? `${farm.apyPeggedCom
                         .times(new BigNumber(100))
                         .toNumber()
                         .toLocaleString('en-US')
                         .slice(0, -1)} %`
                     : 'Loading ...'
               }
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>Pool Weight</span>
              <span>
                {farm.pwr
                  ? `${farm.pwr
                      .times(new BigNumber(100))
                      .toNumber()
                      .toLocaleString('en-US')} %`
                  : 'Loading ...'}
               </span>
            </StyledInsight>
            <StyledInsight>
              <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
              {farm.base === 'chainToken'
		?            

                `${farm.wavaxAmount
                  ? (farm.wavaxAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}
                AVAX`
                
               :
        
                `${farm.peggedComAmount
                  ? (farm.peggedComAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}
                COM+`

                }
              </span>
            </StyledInsight>
            <Spacer />
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Select' : undefined}
              to={`/farms/${farm.id}`}
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: 24px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - 24px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  font-family: 'Hammersmith One', sans-serif;
  color: #333;
  font-size: 24px;
  font-weight: 300;
  margin: 18px 0 0;
  padding: 6px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: 24px;
  width: 24px;
`

const StyledDetails = styled.div`
  margin-top: 9px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: #777;
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 0.6rem;
  background: #fff;
  color: #333;
  width: 100%;
  margin-top: 6px;
  line-height: 32px;
  font-size: 12px;
  border: 1px solid #ccc;
  text-align: center;
  padding: 0 12px;
`

const StyledCardLogo = styled.div`
  //background-color: #fff;
  //border: 1px solid #ccc;
  //height: 99px;
  //width: 99px;
  //border-radius: 90px;
  align-items: center;
  display: flex;
  justify-content: center;
  //margin: 0 auto 16px;
  padding-top: 15px;

  > img {
    height: 45px;
  }
`

const StyledRibbon = styled.div`
  position: absolute;
  right: 12px; 
  top: 1px;
  overflow: hidden;
  width: 30px;
  height: 39px;
  text-align: right;
`

const StyledRibbonText = styled.div`
  position: absolute;
  right: 19px; 
  top: 1px;
  margin-top: 4px;
  margin-right: 1px;
  text-align: center;
  color: #666;
  font-size: 12px;

  > b {
  font-size: 18px;
  font-weight: 600;
  }
`

export default FarmCards
