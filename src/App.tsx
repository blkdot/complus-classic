import React, { useCallback, useEffect, useState, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import ComplusProvider from './contexts/ComplusProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import Staking from './views/Staking'
import ComPlusToken from './views/ComPlusToken'

// imported by @skyhdev
import Swap from './views/Dex/Swap';
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Dex/Swap/redirects'
import PoolFinder from './views/Dex/PoolFinder'
import Pool from './views/Dex/Pool'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './views/Dex/AddLiquidity/redirects'
import AddLiquidity from './views/Dex/AddLiquidity'
import MigrateV1 from './views/Dex/MigrateV1'
import MigrateV1Exchange from './views/Dex/MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './views/Dex/MigrateV1/RemoveV1Exchange'
import RemoveLiquidity from './views/Dex/RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './views/Dex/RemoveLiquidity/redirects'
import styled from 'styled-components'
import Web3ReactManager from './components/Dex/Web3ReactManager'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import 'inter-ui'
import { isMobile } from 'react-device-detect'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { NetworkContextName } from './constants'
import './i18n'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater from './state/user/updater'
import getLibrary from './utils/getLibrary'
import Header from './components/Dex/Header'
import DexThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme/dexTheme'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if ('ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID)
  ReactGA.set({
    customBrowserType: !isMobile ? 'desktop' : 'web3' in window || 'ethereum' in window ? 'mobileWeb3' : 'mobileRegular'
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

window.addEventListener('error', error => {
  ReactGA.exception({
    description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
    fatal: true
  })
})

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

const DexBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 160px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Suspense fallback={null}>
        <Router>
          {/* <TopBar onPresentMobileMenu={handlePresentMobileMenu} swap={true} /> */}
          <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
          {/* <Header /> */}
          <Switch>
            <Route path="/" exact>
              <TopBar onPresentMobileMenu={handlePresentMobileMenu} swap={false} />
              <Home />
            </Route>
            <Route name="farms" path="/farms" component={Farms}>
              <TopBar onPresentMobileMenu={handlePresentMobileMenu} swap={false} />
              <Farms />
            </Route>
            <Route name="staking" path="/staking" component={Staking}>
              <TopBar onPresentMobileMenu={handlePresentMobileMenu} swap={false} />
              <Staking />
            </Route>
            <Route name="peggedCom" path="/peggedCom" component={ComPlusToken}>
              <TopBar onPresentMobileMenu={handlePresentMobileMenu} swap={false} />
              <ComPlusToken />
            </Route>
            {/* added by @skyhdev */}
            <Web3ReactManager>
              <>
                <TopBar onPresentMobileMenu={handlePresentMobileMenu} swap={true} />
                <DexBodyWrapper>
                  <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                  <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/pool" component={Pool} />
                  <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
                  <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                  <Route exact strict path="/migrate/v1" component={MigrateV1} />
                  <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
                  {/* <Route component={RedirectPathToSwapOnly} /> */}
                </DexBodyWrapper>
              </>
            </Web3ReactManager>
          </Switch>
        </Router>
      </Suspense>
      {/*<Disclaimer />*/}
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={43114}
        connectors={{
          walletconnect: { rpcUrl: 'https://api.avax.network/ext/bc/C/rpc' },
        }}
      >
        <ComplusProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider>
                <Web3ReactProvider getLibrary={getLibrary}>
                  <Web3ProviderNetwork getLibrary={getLibrary}>
                    <Provider store={store}>
                      <DexThemeProvider>
                        {children}
                      </DexThemeProvider>
                    </Provider>
                  </Web3ProviderNetwork>
                </Web3ReactProvider>
              </ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </ComplusProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = false //localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])

  return <div />
}

export default App
