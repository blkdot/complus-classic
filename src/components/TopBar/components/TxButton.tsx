import React from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import usePendingTransactions from '../../../hooks/usePendingTransactions'
import Button from '../../Button'

interface TxButtonProps {}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet()
  const pendingTransactions = usePendingTransactions()
  return (
    <>
      {!!account && !!pendingTransactions.length ? (
        <StyledTxButton>
          <Button
            size="sm"
            text={`${pendingTransactions.length} Transaction(s)`}
            href={`https://snowtrace.io/address/${account}`}
          />
        </StyledTxButton>
      ) : null}
    </>
  )
}

const StyledTxButton = styled.div`
  margin-right: 12px;
`

export default TxButton
