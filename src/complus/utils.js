import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getSudoSuAddress = (complus) => {
  return complus && complus.sudoSuAddress
}
export const getComplusAddress = (complus) => {
  return complus && complus.complusAddress
}
export const getWavaxContract = (complus) => {
  return complus && complus.contracts && complus.contracts.wavax
}

export const getSudoSuContract = (complus) => {
  return complus && complus.contracts && complus.contracts.sudoSu
}
export const getComplusContract = (complus) => {
  return complus && complus.contracts && complus.contracts.complus
}

export const getXComStakingContract = (complus) => {
  return complus && complus.contracts && complus.contracts.xComStaking
}

export const getComPlusTokenContract = (complus) => {
  return complus && complus.contracts && complus.contracts.ComPlusTokenPegged
}

export const getFarms = (complus) => {
  return complus
    ? complus.contracts.pools.map(
        ({
          base,
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          base,
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'com',
          earnTokenAddress: complus.contracts.complus.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (sudoSuContract, pid) => {
  const { allocPoint } = await sudoSuContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await sudoSuContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (sudoSuContract, pid, account) => {
  return sudoSuContract.methods.pendingCom(pid, account).call()
}

export const getTotalLPWavaxValue = async (
  sudoSuContract,
  wavaxContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that sudoSuContract owns
  const balance = await lpContract.methods
    .balanceOf(sudoSuContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total wavax value for the lpContract = w1
  const lpContractWavax = await wavaxContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWavaxWorth = new BigNumber(lpContractWavax)
  const totalLpWavaxValue = portionLp.times(lpWavaxWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wavaxAmount = new BigNumber(lpContractWavax)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wavaxAmount,
    totalWavaxValue: totalLpWavaxValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWavax: wavaxAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(sudoSuContract, pid),
  }
}

export const getTotalLPPeggedComValue = async (
  sudoSuContract,
  peggedComContact,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that sudoSuContract owns
  const balance = await lpContract.methods
    .balanceOf(sudoSuContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total com+ value for the lpContract = w1
  const lpContractPeggedCom = await peggedComContact.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpPeggedComWorth = new BigNumber(lpContractPeggedCom)
  const totalLpPeggedComValue = portionLp.times(lpPeggedComWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const peggedComAmount = new BigNumber(lpContractPeggedCom)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    peggedComAmount,
    totalPeggedComValue: totalLpPeggedComValue.div(new BigNumber(10).pow(18)),
    tokenPriceInPeggedCom: peggedComAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(sudoSuContract, pid),
  }
}

export const approve = async (lpContract, sudoSuContract, account) => {
  return lpContract.methods
    .approve(sudoSuContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
      .approve(address, ethers.constants.MaxUint256)
      .send({ from: account })
}

export const getComplusSupply = async (complus) => {
  return new BigNumber(await complus.contracts.complus.methods.totalSupply().call())
}

export const getXComSupply = async (complus) => {
  return new BigNumber(await complus.contracts.xComStaking.methods.totalSupply().call())
}

export const getComPlusTokenSupply = async (complus) => {
  return new BigNumber(await complus.contracts.ComPlusTokenPegged.methods.totalSupply().call())
}

export const stake = async (sudoSuContract, pid, amount, account) => {
  return sudoSuContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (sudoSuContract, pid, amount, account) => {
  return sudoSuContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (sudoSuContract, pid, account) => {
  return sudoSuContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (sudoSuContract, pid, account) => {
  try {
    const { amount } = await sudoSuContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (sudoSuContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1600628400) {
    return sudoSuContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  debugger
  return contract.methods
      .enter(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
      .leave(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}
