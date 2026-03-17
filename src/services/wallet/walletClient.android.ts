import type { VersionedTransaction } from "@solana/web3.js";
import { transact, Web3MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import type { WalletClient, WalletSession } from "./types";
import { connection } from "@/services/solana/connection";

const APP_IDENTITY = {
  name: "Coffee Shop",
  uri: "https://example.com",
  icon: "favicon.ico",
};

async function withAuthorizedWallet<T>(
  fn: (wallet: Web3MobileWallet, account: WalletSession) => Promise<T>
): Promise<T> {
  return transact(async (wallet) => {
    const auth = await wallet.authorize({
      cluster: "solana:devnet",
      identity: APP_IDENTITY,
    });

    const session: WalletSession = {
      publicKey: auth.publicKey.toBase58(),
      // Phantom-specific fields are unused on Android; provide placeholders.
      session: "",
      sharedSecret: new Uint8Array(),
      phantomPublicKey: new Uint8Array(),
    };

    return fn(wallet, session);
  });
}

const connect = async (): Promise<WalletSession> => {
  return withAuthorizedWallet(async (_wallet, session) => session);
};

const disconnect = async (): Promise<void> => {
  await transact(async (wallet) => {
    await wallet.deauthorize();
  });
};

const signAndSendTransaction = async (
  transaction: VersionedTransaction
): Promise<string> => {
  return withAuthorizedWallet(async (wallet) => {
    const [signedTx] = await wallet.signAndSendTransactions({
      transactions: [transaction],
    });

    const signature = await connection.sendRawTransaction(
      signedTx.serialize()
    );

    return signature;
  });
};

export const walletClientAndroid: WalletClient = {
  connect,
  disconnect,
  signAndSendTransaction,
};

export default walletClientAndroid;

