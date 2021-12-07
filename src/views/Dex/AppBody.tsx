import React from 'react'
import styled from 'styled-components'
import { useDarkModeManager } from '../../state/user/hooks'
import Logo from '../../assets/images/complus-logo-black.png'
import LogoDark from '../../assets/images/complus-logo-white.png'
import PoweredByBlack from '../../assets/images/poweredby-black.png'
import PoweredByWhite from '../../assets/images/poweredby-white.png'
import { ExternalLink } from '../../theme/dexTheme'

const LogoLink = styled.a<{ disabled?: boolean }>`
  display: block;
  text-align: center;
  pointer-events: auto;
  text-decoration: none;
  text-decoration-style: unset;
  background: transparent;
  margin-bottom: 18px;

  :hover {
    cursor: pointer;
  }
`

export const ComplusLink = styled(ExternalLink)<{ disabled?: boolean }>`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  margin-top: 18px;

  :hover {
  text-decoration: none;
  }

  :focus {
  text-decoration: none;
  }
`

export const HeadersPlusBodyWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  max-width: 420px;
  width: 100%;
  text-align: center;
`

export const BodyWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.01), 0px 16px 24px rgba(0, 0, 0, 0.01),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 1rem;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  const [isDark] = useDarkModeManager()

  return <HeadersPlusBodyWrapper>
    <BodyWrapper disabled={disabled}>{children}</BodyWrapper>
      <ComplusLink id="link" href="https://docs.avax.network">
         <img style={{ height: 39 }} src={isDark ? PoweredByWhite : PoweredByBlack} alt="Powered by Avalanche" />
      </ComplusLink>
  </HeadersPlusBodyWrapper>
}
