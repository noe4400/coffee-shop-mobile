export type MenuItem = {
  id: string;
  shop: string;
  name: string;
  price: number;
  available: boolean;
};

export type WalletContextType = {
  publicKey?: string;
  setPublicKey: React.Dispatch<React.SetStateAction<string | undefined>>;
};