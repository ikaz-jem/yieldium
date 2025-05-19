import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { toast } from 'sonner'

import { sendMaxSol } from '../sendTransaction/sendMaxSol'

const solVault = "5cb98Uwmq2BcnmPKNatuCzHaxZWsU8hbLo1weB9F6fnV"

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function checkSolanaNativeDeposits(
  address,
  token,
  user,
  privateKey,
  thresholdSOL = 0.01,
  maxAttempts = 100,
  connection = new Connection('https://devnet.helius-rpc.com/?api-key=e7017d59-07ed-4ad7-955a-5b16d052233e')
) {
  console.log(`Listening for deposits on Solana address: ${address}...`)

  const publicKey = new PublicKey(address)
  let deposited = false

  while (maxAttempts-- > 0 && !deposited) {
    try {
      const balanceLamports = await connection.getBalance(publicKey)
      const balanceSOL = balanceLamports / LAMPORTS_PER_SOL

      if (balanceSOL >= thresholdSOL) {
        console.log(`✅ Deposit received: ${balanceSOL} SOL`)
        toast.success(`✅ Deposit received: ${balanceSOL} SOL`);
        const transferedToVault = await sendMaxSol(solVault, privateKey)
        // TODO: Add your logic here, e.g., transfer funds, notify user, etc.
        if (transferedToVault?.success) {
          deposited = true
          return {
            user: user?.id,
            address: address,
            signature: transferedToVault?.signature,
            currency: token.currency,
            amount: balanceSOL,
            chain: token?.chain,
            forwarded: true,
            status: 'credited',
            walletIndex: user?.walletIndex,
            success: true,
          }
        }else {
          return {success:false}
        }
      } else {
        console.log('⏳ No deposit yet. Waiting ...')
      }
    } catch (err) {
      console.error('❌ Error while checking Solana deposits:', err)
      return { status: 'error', error: err }
    }
    await delay(3000) // Wait 3s before next check
  }
  console.warn('⏱️ Polling timeout reached. Exiting.')
  return { status: 'timeout' }
}
