import nacl from "tweetnacl";
import React, { createContext, useCallback, useContext, useState } from "react";

export type WalletSession = {
  publicKey: string;
  session: string;
  sharedSecret: Uint8Array;
  phantomPublicKey: Uint8Array;
};

type WalletContextType = {
  dappKeyPair: nacl.BoxKeyPair;
  walletSession: WalletSession | null;
  setWalletSession: (session: WalletSession | null) => void;
  disconnect: () => void;
};

// Generate once per provider mount — survives re-renders, resets on full remount
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  // dappKeyPair lives in state so it's stable and reactive
  const [dappKeyPair] = useState<nacl.BoxKeyPair>(() => nacl.box.keyPair());
  const [walletSession, setWalletSession] = useState<WalletSession | null>(null);

  const disconnect = useCallback(() => setWalletSession(null), []);

  return (
    <WalletContext.Provider value={{ dappKeyPair, walletSession, setWalletSession, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used inside WalletProvider");
  return context;
};