
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair as SolanaKeypair } from '@solana/web3.js';

const mnemonic = process.env.HD_MNEMONIC;
const seed = await bip39.mnemonicToSeed(mnemonic);

export async function createOrGetSolanaWallet (index){
    const solanaPath = `m/44'/501'/0'/${index}'`;
    const { key: solanaPrivateKey } = derivePath(solanaPath, seed.toString('hex'));
    const solanaWallet = SolanaKeypair.fromSeed(solanaPrivateKey); // Keypair = public + private
    const secretKeyHex = Buffer.from(solanaWallet.secretKey).toString('hex');
    console.log({publicKey:solanaWallet.publicKey.toBase58() ,privateKey:secretKeyHex })
    return {publicKey:solanaWallet.publicKey.toBase58() ,privateKey:secretKeyHex }
}

export async function getSolanaWallet(index = 0) {
    const solanaPath = `m/44'/501'/0'/${index}'`;
    const { key } = derivePath(solanaPath, seed.toString('hex'));
    const solanaKeypair = SolanaKeypair.fromSeed(key);  
    console.log({
        publicKey: solanaKeypair.publicKey.toBase58(),
        secretKey: Buffer.from(solanaKeypair.secretKey).toString('hex'),
        path: solanaPath,
    }) 
    return {
        publicKey: solanaKeypair.publicKey.toBase58(),
        secretKey: Buffer.from(solanaKeypair.secretKey).toString('hex'),
        path: solanaPath,
    };
}

