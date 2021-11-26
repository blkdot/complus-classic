import React from 'react';
import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const contractAddresses = {
  complus: {
    43114: '0x3711c397B6c8F7173391361e27e67d72F252cAad',
  },
  sudoSu: {
    43114: '0xa329D806fbC80a14415588334ae4b205813C6BB2',
  },
  wavax: {
    43114: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  },
  xCom: {
    43114: '0xa238B49BFc48E47533CF7b5488f8C9dA0EFbc843'
  },
  comPlusToken: {
    43114: '0xc5B25a5BEd03bB7c9030Dfe5Be56f21f5c3fCB1B'
  }
}

export const supportedPools = [
  {
    base: 'chainToken',
    pid: 9,
    lpAddresses: {
      43114: '0x6f588BEEA42223Efb3df84C5E6ea937Ad3c81682',
    },
    tokenAddresses: {
      43114: '0xc5B25a5BEd03bB7c9030Dfe5Be56f21f5c3fCB1B',
    },
    name: 'AVAX | COM+',
    symbol: 'AVAX | COM+',
    tokenSymbol: 'COM+',
    icon: <img src={window.location.origin + '/img/pairs/avax-complus.png'} height={60} alt="COM+ | AVAX" />,
  },
  {
    base: 'peggedCom',
    pid: 13,
    lpAddresses: {
      43114: '0x11D06F9463AC791285D9b965095E36103FABb588',
    },
    tokenAddresses: {
      43114: '0x240e5D2931DB2ee1622517ff25dE70673007820A',
    },
    name: 'AVAX+ | COM+',
    symbol: 'AVAX+ | COM+',
    tokenSymbol: 'AVAX+',
    icon: <img src={window.location.origin + '/img/pairs/avax-complus.png'} height={60} alt="AVAX+ | COM+" />,
  },
  {
    base: 'peggedCom',
    pid: 14,
    lpAddresses: {
      43114: '0xa5d2D49737c78201E2Ec5F76cEc609B687591C1f',
    },
    tokenAddresses: {
      43114: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    },
    name: 'USDTe | COM+',
    symbol: 'USDTe | COM+',
    tokenSymbol: 'USDTe',
    icon: <img src={window.location.origin + '/img/pairs/usdt-complus.png'} height={60} alt="USDTe | COM+" />,
  },
  {
    base: 'chainToken',
    pid: 5,
    lpAddresses: {
      43114: '0xF0ED25fD26E0b64C86c6c78b661F2ef283E9B6FF',
    },
    tokenAddresses: {
      43114: '0x3711c397B6c8F7173391361e27e67d72F252cAad',
    },
    name: 'COM | AVAX',
    symbol: 'COM | AVAX',
    tokenSymbol: 'COM',
    icon: <img src={window.location.origin + '/img/pairs/com-avax.png'} height={60} alt="COM | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 8,
    lpAddresses: {
      43114: '0x60b78d111382036ABc5EED987a709B07d52dF9D3',
    },
    tokenAddresses: {
      43114: '0xa238B49BFc48E47533CF7b5488f8C9dA0EFbc843',
    },
    name: 'XCOM | AVAX',
    symbol: 'XCOM | AVAX',
    tokenSymbol: 'XCOM',
    icon: <img src={window.location.origin + '/img/pairs/xcom-avax.png'} height={60} alt="XCOM | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 15,
    lpAddresses: {
      43114: '0xe136787C2b518D3ea7fC57A9e1348E557A12AF99',
    },
    tokenAddresses: {
      43114: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    },
    name: 'USDTe | AVAX',
    symbol: 'USDTe | AVAX',
    tokenSymbol: 'USDTe',
    icon: <img src={window.location.origin + '/img/pairs/usdt-avax.png'} height={60} alt="USDTe | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 16,
    lpAddresses: {
      43114: '0x2E5E4bf853f882Ac90809b72b8B5c82968A97E8B',
    },
    tokenAddresses: {
      43114: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    },
    name: 'DAIe | AVAX',
    symbol: 'DAIe | AVAX',
    tokenSymbol: 'DAIe',
    icon: <img src={window.location.origin + '/img/pairs/dai-avax.png'} height={60} alt="DAIe | AVAX" />,
  }, 
  {
    base: 'chainToken',
    pid: 17,
    lpAddresses: {
      43114: '0xe12b71aa99DE6498a3c33038791BAb89C412aF46',
    },
    tokenAddresses: {
      43114: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    },
    name: 'WETHe | AVAX',
    symbol: 'WETHe | AVAX',
    tokenSymbol: 'WETHe',
    icon: <img src={window.location.origin + '/img/pairs/eth-avax.png'} height={60} alt="WETHe | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 18,
    lpAddresses: {
      43114: '0xA083c141b30eB1C36C8cC199F531fC3E59a18041',
    },
    tokenAddresses: {
      43114: '0x50b7545627a5162F82A992c33b87aDc75187B218',
    },
    name: 'WBTCe | AVAX',
    symbol: 'WBTCe | AVAX',
    tokenSymbol: 'WBTCe',
    icon: <img src={window.location.origin + '/img/pairs/wbtc-avax.png'} height={60} alt="WBTCe | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 4,
    lpAddresses: {
      43114: '0xEcee953e187d9e82D57bAedAaEF1e56E5283f5C3',
    },
    tokenAddresses: {
      43114: '0x60781C2586D68229fde47564546784ab3fACA982',
    },
    name: 'PNG | AVAX',
    symbol: 'PNG | AVAX',
    tokenSymbol: 'PNG',
    icon: <img src={window.location.origin + '/img/pairs/png-avax.png'} height={60} alt="PNG | AVAX" />,
  },
  {
    base: 'peggedCom',
    pid: 10,
    lpAddresses: {
      43114: '0xEb606a9692495cfc10129e9a925C84b180632744',
    },
    tokenAddresses: {
      43114: '0xde3A24028580884448a5397872046a019649b084',
    },
    name: 'USDT | COM+',
    symbol: 'USDT | COM+',
    tokenSymbol: 'USDT',
    icon: <img src={window.location.origin + '/img/pairs/usdt-complus.png'} height={60} alt="USDT | COM+" />,
  },
  {
    base: 'chainToken',
    pid: 0,
    lpAddresses: {
      43114: '0xe64bfAe83BA234aB85BceF5B7A92427E29b3AA11',
    },
    tokenAddresses: {
      43114: '0xde3A24028580884448a5397872046a019649b084',
    },
    name: 'USDT | AVAX',
    symbol: 'USDT | AVAX',
    tokenSymbol: 'USDT',
    icon: <img src={window.location.origin + '/img/pairs/usdt-avax.png'} height={60} alt="USDT | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 2,
    lpAddresses: {
      43114: '0x7583a59a50d761E491d0c9393cA5214dbB613806',
    },
    tokenAddresses: {
      43114: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
    },
    name: 'DAI | AVAX',
    symbol: 'DAI | AVAX',
    tokenSymbol: 'DAI',
    icon: <img src={window.location.origin + '/img/pairs/dai-avax.png'} height={60} alt="DAI | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 1,
    lpAddresses: {
      43114: '0x0CA373D27CE17C4804D108afEee0A77EfEb33775',
    },
    tokenAddresses: {
      43114: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    },
    name: 'ETH | AVAX',
    symbol: 'ETH | AVAX',
    tokenSymbol: 'ETH',
    icon: <img src={window.location.origin + '/img/pairs/eth-avax.png'} height={60} alt="ETH | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 6,
    lpAddresses: {
      43114: '0x35d3D764C4440A309A3a699754B225a11fc99Cc0',
    },
    tokenAddresses: {
      43114: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
    },
    name: 'WBTC | AVAX',
    symbol: 'WBTC | AVAX',
    tokenSymbol: 'WBTC',
    icon: <img src={window.location.origin + '/img/pairs/wbtc-avax.png'} height={60} alt="WBTC | AVAX" />,
  },
  {
    base: 'chainToken',
    pid: 19,
    lpAddresses: {
      43114: '0xbD09DdF1AEE2BDb0a361745eEAd77f915CAba340',
    },
    tokenAddresses: {
      43114: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    },
    name: 'USDTe | AVAX+',
    symbol: 'USDTe | AVAX+',
    tokenSymbol: 'USDTe',
    icon: <img src={window.location.origin + '/img/pairs/usdt-avax.png'} height={60} alt="USDTe | AVAX+" />,
  },

]
