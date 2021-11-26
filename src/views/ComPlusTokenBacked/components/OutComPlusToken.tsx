import React, {useState} from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from "../../../hooks/useModal";
import useTokenBalance from "../../../hooks/useTokenBalance";
import {getBalanceNumber} from '../../../utils/formatBalance'
import WithdrawModal from "./WithdrawModal";
import useComPlusTokenLeave from "../../../hooks/useComPlusTokenLeave";
import {Contract} from "web3-eth-contract";
import bridge_coins from '../../../assets/img/icons/bridge_coins.png'

interface OutComPlusTokenProps {
  lpContract: Contract
}

const OutComPlusToken: React.FC<OutComPlusTokenProps> = ({lpContract}) => {

  const ComPlusTokenBalance = useTokenBalance(lpContract.options.address)
  const [pendingTx, setPendingTx] = useState(false)

  const {onLeave} = useComPlusTokenLeave()

  const tokenName = "COM+"

  const [onPresentLeave] = useModal(
    <WithdrawModal
      max={ComPlusTokenBalance}
      onConfirm={onLeave}
      tokenName={tokenName}
    />,
  )

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon><img src={bridge_coins} height={60} alt="Business" /></CardIcon>
            <Value value={getBalanceNumber(ComPlusTokenBalance)}/>
            <Label text="COM+ Token Available"/>
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!ComPlusTokenBalance.toNumber() || pendingTx}
              text={pendingTx ? 'Converting to COM' : 'Convert to COM'}
              onClick={async () => {
                setPendingTx(true)
                await onPresentLeave()
                setPendingTx(false)
              }}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default OutComPlusToken
