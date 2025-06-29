import { createWalletClient, createPublicClient, http, parseEther, formatEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet , bsc,mainnet,polygon } from 'viem/chains'
import abi from "./abi.json"

import { getWalletClient } from '../web3Utils'
import { getClient } from '../web3Utils'

const TRON_USDT_CONTRACT = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'





export async function transferMaxNative(toAddress, privateKey , chain) {
  const account = privateKeyToAccount(privateKey)

  const walletClient = await getWalletClient(chain , account)
  const publicClient = await getClient(chain)


  // 1. Get current balance
  const balance = await publicClient.getBalance({ address: account.address })


  console.log('Current balance:', formatEther(balance), 'BNB')

  // 2. Estimate gas limit for a simple transfer (usually ~21000)
  const gasLimit = await publicClient.estimateGas({
    account: account.address,
    to: toAddress,
    value: 0n, // value 0 because we just want gas estimate for transfer
  })
  console.log('Estimated gas limit:', gasLimit.toString())

  // 3. Estimate fees per gas (EIP-1559)
  const { maxFeePerGas, maxPriorityFeePerGas } = await publicClient.estimateFeesPerGas()

  // 4. Calculate total gas cost = gasLimit * maxFeePerGas
  const totalGasCost = gasLimit * maxFeePerGas
  console.log('Estimated total gas cost:', formatEther(totalGasCost), 'BNB')

  // 5. Calculate max value to send = balance - totalGasCost
  if (balance <= totalGasCost) {
    throw new Error('Insufficient balance to cover gas fees')
  }
  const valueToSend = balance - totalGasCost
  console.log('Max value to send:', formatEther(valueToSend), 'BNB')

  // 6. Send transaction with adjusted value
  try {
    const txHash = await walletClient.sendTransaction({
      to: toAddress,
      value: valueToSend,
    })
    console.log('Transaction sent:', txHash)

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash })

    if (receipt.status === 'success' || receipt.status === 1) {
      console.log('Transaction confirmed in block', receipt.blockNumber)
      return { success: true, signature: txHash }
    } else {
      console.error('Transaction failed')
    }
  } catch (error) {
    console.error('Transaction failed to send:', error)
  }
}




export async function deductPercent(privateKey, toAddress,chain) {
  const account = privateKeyToAccount(privateKey)

  const walletClient = createWalletClient({
    account,
    chain: bscTestnet,
    transport: http(),
  })

  const publicClient = createPublicClient({
    chain: bscTestnet,
    transport: http(),
  })


  // 1. Get current balance
  const balance = await publicClient.getBalance({ address: account.address })
  console.log('Current balance:', formatEther(balance), 'BNB')
  let percent = (formatEther(balance) * 10) / 100

  console.log('Percentage:', percent, 'BNB')
  // 2. Estimate gas limit for a simple transfer (usually ~21000)
  const gasLimit = await publicClient.estimateGas({
    account: account.address,
    to: toAddress,
    value: 0n, // value 0 because we just want gas estimate for transfer
  })
  console.log('Estimated gas limit:', gasLimit.toString())

  // 3. Estimate fees per gas (EIP-1559)
  const { maxFeePerGas, maxPriorityFeePerGas } = await publicClient.estimateFeesPerGas()

  // 4. Calculate total gas cost = gasLimit * maxFeePerGas
  const totalGasCost = gasLimit * maxFeePerGas
  console.log('Estimated total gas cost:', formatEther(totalGasCost), 'BNB')

  // 5. Calculate max value to send = balance - totalGasCost
  if (balance <= totalGasCost) {
    throw new Error('Insufficient balance to cover gas fees')
  }
  const valueToSend = balance - totalGasCost
  console.log('Max value to send:', formatEther(valueToSend), 'BNB')

  // 6. Send transaction with adjusted value
  try {
    const txHash = await walletClient.sendTransaction({
      to: toAddress,
      value: parseEther(percent.toString()),
      //   gas: gasLimit * 11n / 10n, // add 10% gas buffer
      //   maxFeePerGas,
      //   maxPriorityFeePerGas,
    })
    console.log('Transaction sent:', txHash)
    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash })

    if (receipt.status === 'success' || receipt.status === 1) {
      console.log('Transaction confirmed in block', receipt.blockNumber)
    } else {
      console.error('Transaction failed')
    }
  } catch (error) {
    console.error('Transaction failed to send:', error)
  }
}






export async function transferMaxERC20(to, privateKey, token, amount) {

  const account = privateKeyToAccount(privateKey)

  const walletClient = createWalletClient({
    account,
    chain: bscTestnet,
    transport: http(),
  })

  const Erc20Address = token?.contractAddress

  const approveTxHash = await walletClient.writeContract({
    address: Erc20Address,
    abi,
    functionName: 'approve',
    args: [to, amount]
  })

  console.log('Approve sent:', approveTxHash)
  const transferHash = await walletClient.writeContract({
    address: Erc20Address,
    abi,
    functionName: 'transfer',
    args: [to, amount]
  })

  
  console.log('Transfer tx sent:', transferHash)
  return {success:true,signature:transferHash}

}