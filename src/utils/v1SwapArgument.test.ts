import { CurrencyAmount, ETHER, Percent, Route, TokenAmount, Trade } from '@complus/sdk-ava'
import { DAI, AUSD } from '../constants'
import { MockV1Pair } from '../data/V1'
import v1SwapArguments from './v1SwapArguments'

describe('v1SwapArguments', () => {
  const AUSD_WAVAX = new MockV1Pair('1000000', new TokenAmount(AUSD, '1000000'))
  const DAI_WAVAX = new MockV1Pair('1000000', new TokenAmount(DAI, '1000000'))

  // just some random address
  const TEST_RECIPIENT_ADDRESS = AUSD_WAVAX.liquidityToken.address

  function checkDeadline(hex: string | string[], ttl: number) {
    if (typeof hex !== 'string') throw new Error('invalid hex')
    const now = new Date().getTime() / 1000
    expect(parseInt(hex) - now).toBeGreaterThanOrEqual(ttl - 3)
    expect(parseInt(hex) - now).toBeLessThanOrEqual(ttl + 3)
  }

  it('exact eth to token', () => {
    const trade = Trade.exactIn(new Route([AUSD_WAVAX], ETHER), CurrencyAmount.ether('100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      ttl: 20 * 60
    })
    expect(result.methodName).toEqual('ethToTokenTransferInput')
    expect(result.args[0]).toEqual('0x62')
    expect(result.args[2]).toEqual(TEST_RECIPIENT_ADDRESS)
    checkDeadline(result.args[1], 20 * 60)
    expect(result.value).toEqual('0x64')
  })
  it('exact token to eth', () => {
    const trade = Trade.exactIn(new Route([AUSD_WAVAX], AUSD, ETHER), new TokenAmount(AUSD, '100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      ttl: 20 * 60
    })
    expect(result.methodName).toEqual('tokenToEthTransferInput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x62')
    checkDeadline(result.args[2], 20 * 60)
    expect(result.args[3]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.value).toEqual('0x0')
  })
  it('exact token to token', () => {
    const trade = Trade.exactIn(new Route([AUSD_WAVAX, DAI_WAVAX], AUSD), new TokenAmount(AUSD, '100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      ttl: 20 * 60
    })
    expect(result.methodName).toEqual('tokenToTokenTransferInput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x61')
    expect(result.args[2]).toEqual('0x1')
    expect(result.args[4]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.args[5]).toEqual(DAI.address)
    checkDeadline(result.args[3], 20 * 60)
    expect(result.value).toEqual('0x0')
  })
  it('eth to exact token', () => {
    const trade = Trade.exactOut(new Route([AUSD_WAVAX], ETHER), new TokenAmount(AUSD, '100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      ttl: 20 * 60
    })
    expect(result.methodName).toEqual('ethToTokenTransferOutput')
    expect(result.args[0]).toEqual('0x64')
    checkDeadline(result.args[1], 20 * 60)
    expect(result.args[2]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.value).toEqual('0x66')
  })
  it('token to exact eth', () => {
    const trade = Trade.exactOut(new Route([AUSD_WAVAX], AUSD, ETHER), CurrencyAmount.ether('100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      ttl: 20 * 60
    })
    expect(result.methodName).toEqual('tokenToEthTransferOutput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x66')
    checkDeadline(result.args[2], 20 * 60)
    expect(result.args[3]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.value).toEqual('0x0')
  })
  it('token to exact token', () => {
    const trade = Trade.exactOut(new Route([AUSD_WAVAX, DAI_WAVAX], AUSD), new TokenAmount(DAI, '100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      ttl: 20 * 60
    })
    expect(result.methodName).toEqual('tokenToTokenTransferOutput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x67')
    expect(result.args[2]).toEqual(`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`)
    checkDeadline(result.args[3], 20 * 60)
    expect(result.args[4]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.args[5]).toEqual(DAI.address)
    expect(result.value).toEqual('0x0')
  })
})
