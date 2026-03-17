import type { VersionedTransaction } from "@solana/web3.js";
import type { WalletClient, WalletSession } from "./types";
// iOS implementation: thin wrapper around Phantom deep links.
// connect() is effectively fire-and-forget; the Linking listener
// in navigation will populate WalletContext when Phantom redirects back.

const connect = async (): Promise<WalletSession> => {
  // We cannot construct a WalletSession synchronously here because
  // it is established via the deep-link callback. For now we trigger
  // the Phantom connect flow and reject to indicate the session will
  // be available via context once the callback returns.
  // The UI already only relies on WalletContext, not this return value.
  throw new Error("connect() is not wired to WalletScreen yet");
};

const disconnect = (): void => {
  // Actual state clearing is handled via WalletContext.disconnect(),
  // which is already used by WalletScreen. This method exists to
  // satisfy the WalletClient interface and for future parity.
};

const signAndSendTransaction = async (
  _transaction: VersionedTransaction
): Promise<string> => {
  // Transaction signing and sending is currently handled in
  // BottomTabsNavigator via Phantom callback decryption.
  // This method will be implemented when we migrate that logic
  // into the wallet client.
  throw new Error("signAndSendTransaction is not implemented for iOS yet");
};

export const walletClientIOS: WalletClient = {
  connect,
  disconnect,
  signAndSendTransaction,
};

export default walletClientIOS;

