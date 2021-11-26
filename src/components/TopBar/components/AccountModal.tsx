import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useComplus from '../../../hooks/useComplus'
import { getComplusAddress } from '../../../complus/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import treasure from '../../../assets/img/icons/treasure.png'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const complus = useComplus()
  const complusBalance = useTokenBalance(getComplusAddress(complus))
  
  return (
    <Modal>
      <ModalTitle text="My Account" />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <img src={treasure} height={60} alt="Treasure" />
            </CardIcon>
            <StyledBalance>
              <Value value={getBalanceNumber(complusBalance)} />
              <Label text="COM Balance" />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>
        
        <StyledAddress>{`${account}`}</StyledAddress>

        <Spacer />
        <Button
          href={`https://snowtrace.io/address/${account}`}
          text="View on Avalanche"
          variant="secondary"
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text="Sign out"
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 24px;
`

const StyledAddress = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  color: #48bf91;
  font-size: 16px;
  font-weight: 600;
`

export default AccountModal
