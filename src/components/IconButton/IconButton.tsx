import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface IconButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  to?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  disabled,
  onClick,
  to,
}) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {!!to ? <StyledLink to={to}>{children}</StyledLink> : children}
    </StyledButton>
  )
}

interface StyledButtonProps {
  disabled?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: #b22234;
  border: 0;
  border-radius: 0.6rem;
  color: ${(props) =>
    !props.disabled
      ? props.theme.color.primary.main
      : props.theme.color.grey[400]};
  cursor: pointer;
  display: flex;
  font-weight: 700;
  height: 39px;
  justify-content: center;
  letter-spacing: 1px;
  outline: none;
  padding: 0;
  margin: 0;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  text-transform: uppercase;
  width: 56px;
  &:hover {
    background-color: #666;
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 48px;
  justify-content: center;
  margin: 0 9px;
  padding: 0 9px;
  text-decoration: none;
`

export default IconButton
