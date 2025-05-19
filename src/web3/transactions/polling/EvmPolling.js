import { toast } from 'sonner'
import { transferMaxNative } from '../sendTransactionWithSecret';
import abi from '../abi.json'

import { mainnet, bsc, bscTestnet, polygon } from 'viem/chains'
import { parseAbi } from 'viem'
import { createPublicClient, http, formatEther, erc20Abi } from 'viem'


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http()
})




export async function CheckEvmsNativeDeposits(address, token, user, privateKey) {

  if (token?.network !== 'evm') return;

  console.log(`Listening for deposits on ${address}...`);
  let deposited = false
  let maxAttempts = 100; // Optional: 10 minutes if polling every 2s

  while (maxAttempts-- > 0 && !deposited) {
    try {
      const currentBalanceWei = await publicClient.getBalance({ address });
      const balance = Number(formatEther(currentBalanceWei));

      if (balance >= 0.01) {
        console.log(`✅ Deposit received: ${balance} BNB`);
        toast.success(`New deposit detected: ${balance} BNB`);

        const transferToVault = await transferMaxNative(
          '0x9156fB636d942A916eB165559348e806818b3bD4',
          privateKey,
          token,
        );

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
