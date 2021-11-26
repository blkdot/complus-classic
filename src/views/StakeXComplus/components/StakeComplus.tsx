import BigNumber from 'bignumber.js'
import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import {getBalanceNumber} from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import {contractAddresses} from '../../../complus/lib/constants'
import useEnter from "../../../hooks/useEnter";
import useLeave from "../../../hooks/useLeave";
import useAllowanceStaking from "../../../hooks/useAllowanceStaking";
import useApproveStaking from "../../../hooks/useApproveStaking";
import moneys from '../../../assets/img/icons/moneys.png'

interface StakeProps {
}

const StakeComplus: React.FC<StakeProps> = ({}) => {
  const tokenName = "COM"
  const [requestedApproval, setRequestedApproval] = useState(false)

  const allowance = useAllowanceStaking()
  const {onApprove} = useApproveStaking()

  const tokenBalance = useTokenBalance(contractAddresses.complus[43114])

  const {onEnter} = useEnter()
  const {onLeave} = useLeave()

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onEnter}
      tokenName={tokenName}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon><img src={moneys} height={60} alt="Moneys" /></CardIcon>
            <Value value={getBalanceNumber(tokenBalance)}/>
            <Label text={`COM Tokens Available`}/>
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={`Approve COM`}
              />
            ) : (
              <>
                <Button
                  disabled={tokenBalance.eq(new BigNumber(0))}
                  onClick={onPresentDeposit}
                  text={`Convert to xCOM`}
                />
              </>
            )}
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
  margin-top: 48px;
  width: 100%;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default StakeComplus
