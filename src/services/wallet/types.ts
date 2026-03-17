import type { VersionedTransaction } from "@solana/web3.js";

export type WalletSession = {
  publicKey: string;
  session: string;
  sharedSecret: Uint8Array;
  phantomPublicKey: Uint8Array;
};

export type WalletAccount = {
  publicKey: string;
  label?: string;
};

export interface WalletClient {
  connect(): Promise<WalletSession>;
  disconnect(): Promise<void> | void;
  signAndSendTransaction(transaction: VersionedTransaction): Promise<string>;
}

