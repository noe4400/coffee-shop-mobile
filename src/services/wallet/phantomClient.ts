import nacl from "tweetnacl";
import bs58 from "bs58";
import * as Linking from "expo-linking";
import { PHANTOM_CONNECT_URL, SOLANA_NETWORK } from "../solana/solana";

let dappKeyPair: nacl.BoxKeyPair | null = null;

export const createPhantomConnection = () => {
  dappKeyPair = nacl.box.keyPair();

  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    cluster: SOLANA_NETWORK,
    redirect_link: Linking.createURL("/"),
    app_url: Linking.createURL("/"),
  });

  const url = `${PHANTOM_CONNECT_URL}?${params.toString()}`;

  Linking.openURL(url);
};

export const decryptPhantomPayload = (queryParams: any) => {
  if (!dappKeyPair) return null;

  const phantomPubKey = bs58.decode(queryParams.phantom_encryption_public_key);
  const nonce = bs58.decode(queryParams.nonce);
  const encryptedData = bs58.decode(queryParams.data);

  const sharedSecret = nacl.box.before(phantomPubKey, dappKeyPair.secretKey);

  const decrypted = nacl.box.open.after(
    encryptedData,
    nonce,
    sharedSecret
  );

  if (!decrypted) return null;

  return JSON.parse(new TextDecoder().decode(decrypted));
};