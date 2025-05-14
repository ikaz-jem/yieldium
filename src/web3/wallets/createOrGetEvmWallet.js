

import * as bip39 from 'bip39';
import { ethers } from 'ethers';

const mnemonic = process.env.HD_MNEMONIC;
const seed = await bip39.mnemonicToSeed(mnemonic);

export async function createOrGetEvmWallet(index) {
    const evmPath = `m/44'/60'/0'/0'/${index}'`;
    const evmWallet = ethers.HDNodeWallet.fromSeed(seed).derivePath(evmPath);
    return { publicKey: evmWallet.address, privateKey: evmWallet.privateKey }
}


export async function getEvmWallet(index) {
    const evmPath = `m/44'/60'/0'/0'/${index}'`;

    const hdNode = ethers.HDNodeWallet.fromSeed(seed).derivePath(evmPath);
    console.log({
        address: hdNode.address,
        publicKey: hdNode.publicKey,
        privateKey: hdNode.privateKey,
        path: evmPath
    })
    return {
        address: hdNode.address,
        publicKey: hdNode.publicKey,
        privateKey: hdNode.privateKey,
        path: evmPath
    };
}

