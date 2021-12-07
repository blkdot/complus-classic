import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

import { RowBetween } from '../Row'
import { ChevronDown } from 'react-feather'
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components'

const Base = styled(RebassButton)<{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  padding: ${({ padding }) => (padding ? padding : '18px')};
  width: ${({ width }) => (width ? width : '100%')};
  font-weight: 500;
  text-align: center;
  border-radius: 0.5rem;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background-color: #b22234;
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${darken(0.05, '#b22234')};
    background-color: ${darken(0.05, '#b22234')};
  }
  &:hover {
    background-color: ${darken(0.05, '#b22234')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#b22234')};
    background-color: ${darken(0.1, '#b22234')};
  }
  &:disabled {
    background-color: ${({ altDisabledStyle }) => (altDisabledStyle ? '#b22234' : '#EDEEF2')};
    color: ${({ altDisabledStyle }) => (altDisabledStyle ? 'white' : '#888D9B')};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`

export const ButtonLight = styled(Base)`
  background-color: #e7e7e7;
  color: #474747;
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({disabled }) => !disabled && darken(0.03, '#e7e7e7')};
    background-color: ${({disabled }) => !disabled && darken(0.03, '#e7e7e7')};
  }
  &:hover {
    background-color: ${({disabled }) => !disabled && darken(0.03, '#e7e7e7')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({disabled }) => !disabled && darken(0.05, '#e7e7e7')};
    background-color: ${({disabled }) => !disabled && darken(0.05, '#e7e7e7')};
  }
  :disabled {
    opacity: 0.4;
    :hover {
      cursor: auto;
      background-color: #e7e7e7;
      box-shadow: none;
      border: 1px solid transparent;
      outline: none;
    }
  }
`

export const ButtonGray = styled(Base)`
  background-color: #EDEEF2;
  color: #565A69;
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({disabled }) => !disabled && darken(0.05, '#F7F8FA')};
    background-color: ${({disabled }) => !disabled && darken(0.05, '#F7F8FA')};
  }
  &:hover {
    background-color: ${({disabled }) => !disabled && darken(0.05, '#F7F8FA')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({disabled }) => !disabled && darken(0.1, '#F7F8FA')};
    background-color: ${({disabled }) => !disabled && darken(0.1, '#F7F8FA')};
  }
`

export const ButtonSecondary = styled(Base)`
  background-color: #e7e7e7;
  color: #474747;
  font-size: 16px;
  border-radius: 0.5rem;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt #fbbbbb;
    background-color: #fbbbbb;
  }
  &:hover {
    background-color: #fbbbbb;
  }
  &:active {
    box-shadow: 0 0 0 1pt #fbbbbb;
    background-color: #fbbbbb;
  }
  &:disabled {
    background-color: #e7e7e7;
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonPink = styled(Base)`
  background-color: #b22234;
  color: white;

  &:focus {
    box-shadow: 0 0 0 1pt ${darken(0.05, '#b22234')};
    background-color: ${darken(0.05, '#b22234')};
  }
  &:hover {
    background-color: ${darken(0.05, '#b22234')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#b22234')};
    background-color: ${darken(0.1, '#b22234')};
  }
  &:disabled {
    background-color: #b22234;
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonOutlined = styled(Base)`
  border: 1px solid #F7F8FA;
  background-color: transparent;
  color: #000000;

  &:focus {
    box-shadow: 0 0 0 1px #CED0D9;
  }
  &:hover {
    box-shadow: 0 0 0 1px #CED0D9;
  }
  &:active {
    box-shadow: 0 0 0 1px #CED0D9;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: #b22234;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    background-color: rgba(255,255,255,0.5);
  }
  &:hover {
    background-color: rgba(255,255,255,0.5);
  }
  &:active {
    background-color: rgba(255,255,255,0.5);
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonWhite = styled(Base)`
  border: 1px solid #edeef2;
  background-color: #FFFFFF;
  color: black;

  &:focus {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    box-shadow: 0 0 0 1pt ${darken(0.05, '#edeef2')};
  }
  &:hover {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonConfirmedStyle = styled(Base)`
  background-color: ${lighten(0.5, '#27AE60')};
  color: #27AE60;
  border: 1px solid #27AE60;

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonErrorStyle = styled(Base)`
  background-color: #FF6871;
  border: 1px solid #FF6871;

  &:focus {
    box-shadow: 0 0 0 1pt ${darken(0.05, '#FF6871')};
    background-color: ${darken(0.05, '#FF6871')};
  }
  &:hover {
    background-color: ${darken(0.05, '#FF6871')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#FF6871')};
    background-color: ${darken(0.1, '#FF6871')};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: #FF6871;
    border: 1px solid #FF6871;
  }
`

export function ButtonConfirmed({
  confirmed,
  altDisabledStyle,
  ...rest
}: { confirmed?: boolean; altDisabledStyle?: boolean } & ButtonProps) {
  if (confirmed) {
    return <ButtonConfirmedStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} altDisabledStyle={altDisabledStyle} />
  }
}

export function ButtonError({ error, ...rest }: { error?: boolean } & ButtonProps) {
  if (error) {
    return <ButtonErrorStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}

export function ButtonDropdown({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonPrimary {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonPrimary>
  )
}

export function ButtonDropdownLight({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonOutlined {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonOutlined>
  )
}

export function ButtonRadio({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (!active) {
    return <ButtonWhite {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}
