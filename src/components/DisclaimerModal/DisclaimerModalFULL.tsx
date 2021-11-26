import React, { useCallback, useState, useMemo } from 'react'
import styled from 'styled-components'

import Button from '../Button'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

import omur from '../../assets/img/complus.svg'
import approval from '../../assets/img/icons/approval.png'
import grapes from '../../assets/img/icons/grapes.png'
import gift from '../../assets/img/icons/gift.png'
import document from '../../assets/img/icons/document.png'

interface DisclaimerModal extends ModalProps {
  onConfirm: () => void
}

const StyledDiv = styled.div`
  text-align: center;

  > p b {
    color: #666;
  }
  > hr {
    border-top: 1px solid #ccc
  }
`

const StyledImg = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`
const StyledLink = styled.a`
  color: #b22234;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    color: #666;
  }
`

const DisclaimerModal: React.FC<DisclaimerModal> = ({
  onConfirm,
  onDismiss,
}) => {
  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])

  const modalContent = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <StyledDiv>
          <CardIcon>
            <img src={omur} height="60" alt="Complus Network" />
          </CardIcon>
          <p>
            The Yield Farming and Staking contract has been deployed and verified on Avalanche C-Chain.
          </p>
          <p>
            <StyledLink target="_blank" href="https://snowtrace.io/address/0xFE9Cac9632c896E1901bbeC8a0a918061CA4bf15#code">Our Contract</StyledLink>
          </p>
          <hr/>
          <p>
            <img src={approval} height="60" alt="Approval" /><br/>COM distribution will start from block number <b>2122426</b>. (Estimated: 2021.02.15 | 00:00:01 UTC)
          </p>
          <p>
            COM distribution will be <u>10x</u> on the first day (60 COM per block). After block number <b>2151226</b>, distribution will be (6 COM) per a block for the first year on the Avalanche C-Chain.
          </p>
        </StyledDiv>
      )
    } else {
      return (
        <StyledDiv>
          <p>
            <img src={gift} height="69" alt="Gift" /><br/>8.220.000 COM minted to the airdrop owner address.
          </p> 
          <p>All airdrop details will be announced in the future.</p>
          <p>Airdrop owner address:<br/>
            <StyledLink target="_blank" href="https://snowtrace.io/address/0x5dB72a2fB612838E879d452033a685143eA3593f#tokentxns">
              0x5dB72a2fB612838E879d452033a685143eA3593f
            </StyledLink>
          </p>
          <hr/>
          <p>
            <img src={grapes} height="69" alt="Grapes" /><br/>1.404.000 COM minted to the team allocation address.
          </p> 
          <p>Payments will be made monthly. Team will receive 39.000 COM.</p>
          <p>Team allocation address:<br/>
            <StyledLink target="_blank" href="https://snowtrace.io/address/0x1533eefEf4a35b28458472bF21fC84d66e94C69E#tokentxns">
              0x1533eefEf4a35b28458472bF21fC84d66e94C69E
            </StyledLink>
          </p>
          <hr/>
          <p>
            <img src={document} height="60" alt="Litepaper" /><br/>All details and initial roadmap in our Litepaper.<br/>
            <StyledLink target="_blank" href="https://complus.network/litepaper.pdf">
              Click here to our Litepaper.
            </StyledLink>
          </p>
        </StyledDiv>
      )
    }
  }, [step])

  const button = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <Button
          text="Next"
          variant="secondary"
          onClick={() => setStep('uniswap')}
        />
      )
    } else {
      return <Button text="Continue To Complus Network" onClick={handleConfirm} />
    }
  }, [setStep, step, handleConfirm])

  return (
    <Modal>
      <ModalTitle text={`Announcement`} />
      <ModalContent>{modalContent}</ModalContent>
      <ModalActions>{button}</ModalActions>
    </Modal>
  )
}

export default DisclaimerModal
