
import { derivePath } from 'ed25519-hd-key';
import TonWeb from 'tonweb';
import * as bip39 from 'bip39';

const mnemonic = process.env.HD_MNEMONIC;
const seed = await bip39.mnemonicToSeed(mnemonic);

// export async function createOrGetTonWallet(index) {
//     const tonPath = `m/44'/607'/0'/${index}'`;
//     const { key: tonSeed } = derivePath(tonPath, seed.toString('hex')); // 32 bytes
//     const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(tonSeed);
//     const tonWeb = new TonWeb();
//     const tonWallet = tonWeb.wallet.create({ publicKey: keyPair.publicKey });
//     const tonAddress = await tonWallet.getAddress();
//     return { publicKey: tonAddress.toString(true, true, true), privateKey: Buffer.from(keyPair.secretKey).toString('hex')}
// }


// export async function getTonWallet(index = 0) {
//     const tonPath = `m/44'/607'/0'/${index}'`;
//     const { key } = derivePath(tonPath, seed.toString('hex'));
//     const tonWeb = new TonWeb();
//     const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(key);
//     const tonWallet = tonWeb.wallet.create({ publicKey: keyPair.publicKey });
//     const address = await tonWallet.getAddress();
//             console.log({
//         publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
//         secretKey: Buffer.from(keyPair.secretKey).toString('hex'),
//         address: address.toString(true, true, true),
//         path: tonPath,
//     })
//     return {
//         publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
//         secretKey: Buffer.from(keyPair.secretKey).toString('hex'),
//         address: address.toString(true, true, true),
//         path: tonPath,
//     };
// }


export async function getTonWallet(index) {

  const path = `m/44'/607'/0'/${index}'`;
  const { key } = derivePath(path, seed.toString('hex'));
  const tonSeed = key.slice(0, 32); // Ensure it's 32 bytes

  const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(tonSeed);

  const tonWeb = new TonWeb();

  // Create wallet with the public key from the key pair
  const tonWallet = tonWeb.wallet.create({ publicKey: keyPair.publicKey });

  try {
    console.log("Attempting to get TON address...");
    const tonAddress = await tonWallet.getAddress();
    console.log( {
      address: tonAddress.toString(true, true, true),  // Format the address
      publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
      secretKey: Buffer.from(keyPair.secretKey).toString('hex'),
      path,  // Include the path for reference
    })  // Get the address
    return {
      address: tonAddress.toString(true, true, true),  // Format the address
      publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
      secretKey: Buffer.from(keyPair.secretKey).toString('hex'),
      path,  // Include the path for reference
    };
  } catch (error) {
    console.error("Error getting TON address:", error);  // Log the actual error
    throw new Error(`Failed to retrieve TON address: ${error.message}`);
  }
}

