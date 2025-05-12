// lib/hdwallet.js
import bip39 from 'bip39';
import { ethers } from 'ethers';
import { derivePath } from 'ed25519-hd-key';
import { Keypair as SolanaKeypair } from '@solana/web3.js';
import TonWeb from 'tonweb';


const mnemonic = process.env.HD_MNEMONIC;
const seed = await bip39.mnemonicToSeed(mnemonic);

// --------- EVM (ETH/BSC)
export function deriveEvmWallet(index) {
  const path = `m/44'/60'/0'/0/${index}`;
  return ethers.HDNodeWallet.fromSeed(seed).derivePath(path);
}

// --------- Solana
export function deriveSolanaWallet(index) {
  const path = `m/44'/501'/${index}'/0'`;
  const { key } = derivePath(path, seed.toString('hex'));
  return SolanaKeypair.fromSeed(key);
}

// --------- TON
export async function deriveTonWallet(index) {
  const path = `m/44'/607'/${index}'/0'`;
  const { key } = derivePath(path, seed.toString('hex'));
  const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(key);
  const tonWeb = new TonWeb();
  const wallet = tonWeb.wallet.create({ publicKey: keyPair.publicKey });
  const address = await wallet.getAddress();
  return {
    keyPair,
    address: address.toString(true, true, true),
  };
}
