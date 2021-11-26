import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import {useWallet} from 'use-wallet'
import bridge_token from '../../assets/img/complus_bridge.svg'
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
import ComPlusTokenBacked from "../ComPlusTokenBacked";

const ComPlusToken: React.FC = () => {
  const {path} = useRouteMatch()
  const {account} = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal/>)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={bridge_token} height="60"  alt="Complus Network" />}
                subtitle="Welcome to the COM+ swap 1:1 to COM"
                title="COM+"
              />
            </Route>
            <ComPlusTokenBacked/>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default ComPlusToken
