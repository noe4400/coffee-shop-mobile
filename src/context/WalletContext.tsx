import { WalletContextType } from "@/types";
import React, { createContext, useContext, useState } from "react";

type WalletProviderProps = {
  children: React.ReactNode;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [publicKey, setPublicKey] = useState<string | undefined>();
  const [session, setSession]  = useState<string | undefined>();

  return (
    <WalletContext.Provider value={{ publicKey, setPublicKey, session, setSession }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used inside WalletProvider");
  return context;
};