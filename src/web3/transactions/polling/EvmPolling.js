import { toast } from 'sonner'
import { transferMaxNative } from '../sendTransactionWithSecret';
import abi from '../abi.json'

import { mainnet, bsc, bscTestnet, polygon } from 'viem/chains'
import { parseAbi } from 'viem'
import { createPublicClient, http, formatEther, erc20Abi } from 'viem'
import { appBaseRoutes } from '@/routes';


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http()
})


const evmVault = "0x9156fB636d942A916eB165559348e806818b3bD4"


export async function CheckEvmsNativeDeposits(address, token, user, privateKey) {

  if (token?.network !== 'evm') return;

  console.log(`Listening for deposits on ${address}...`);
  let deposited = false
  let maxAttempts = 10; // Optional: 10 minutes if polling every 2s
 let threshold = 0.01

  while (maxAttempts-- > 0 && !deposited && window.location.pathname == appBaseRoutes.deposit) {
    try {
      const currentBalanceWei = await publicClient.getBalance({ address });
      const balance = Number(formatEther(currentBalanceWei));

      if (balance >= threshold) {
        console.log(`✅ Deposit received: ${balance} BNB`);
        toast.success(`New deposit detected: ${balance} BNB`);

        const transferToVault = await transferMaxNative(evmVault,privateKey);

        if (transferToVault?.success) {
          deposited = true
          console.log({ success: true, message: '✅ Funds transferred. Exiting loop.', hash: transferToVault?.signature });
          return {
            user: user?.id,
            address: address,
            signature: transferToVault?.signature,
            currency: token.currency,
            amount: balance,
            chain: token?.chain,
            forwarded: true,
            status: 'credited',
            walletIndex: user?.walletIndex,
            success: true,
          };
        } else {
          console.error('❌ Transfer failed. Exiting loop.');
          return { status: 'transfer_failed', success: false };
        }
      } else {
        console.log('⏳ No deposit yet. Waiting...');
      }
    } catch (err) {
      console.error('❌ Error while checking deposits:', err);
      return { status: 'error', error: err };
    }

    await delay(3000); // Wait 2s before next check
  }

  console.warn('⏱️ Polling timeout reached. Exiting.');
  return { status: 'timeout' };
}
