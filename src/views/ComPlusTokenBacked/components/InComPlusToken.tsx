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
import useComPlusTokenEnter from "../../../hooks/useComPlusTokenEnter";
import useComPlusTokenAllowance from "../../../hooks/useComPlusTokenAllowance";
import useComPlusTokenApprove from "../../../hooks/useComPlusTokenApprove";
import moneys from '../../../assets/img/icons/moneys.png'

interface InComPlusTokenProps {
}

const InComPlusToken: React.FC<InComPlusTokenProps> = ({}) => {
  const tokenName = "COM"
  const [requestedApproval, setRequestedApproval] = useState(false)

  const allowance = useComPlusTokenAllowance()
  const {onApprove} = useComPlusTokenApprove()

  const tokenBalance = useTokenBalance(contractAddresses.complus[43114])

  const {onEnter} = useComPlusTokenEnter()

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
                  text={`Convert to COM+`}
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

export default InComPlusToken
