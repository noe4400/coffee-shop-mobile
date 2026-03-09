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
export let sharedSecret: Uint8Array | null = null;
export let phantomEncryptionPublicKey: Uint8Array | null = null;
export const decryptPhantomPayload = (queryParams: any) => {
  if (!dappKeyPair) return null;
  console.log("Decrypting Phantom payload with query params:", queryParams);

  // error callback — return early
  if (queryParams.errorCode) return null;

  // connect response — has phantom_encryption_public_key
  if (queryParams.phantom_encryption_public_key) {
    const phantomPubKey = bs58.decode(queryParams.phantom_encryption_public_key);
    const nonce = bs58.decode(queryParams.nonce);
    const encryptedData = bs58.decode(queryParams.data);

    sharedSecret = nacl.box.before(phantomPubKey, dappKeyPair.secretKey);

    const decrypted = nacl.box.open.after(encryptedData, nonce, sharedSecret);
    if (!decrypted) return null;
    return JSON.parse(new TextDecoder().decode(decrypted));
  }

  // transaction callback — no phantom_encryption_public_key, reuse existing sharedSecret
  if (queryParams.data && queryParams.nonce && sharedSecret) {
    const nonce = bs58.decode(queryParams.nonce);
    const encryptedData = bs58.decode(queryParams.data);

    const decrypted = nacl.box.open.after(encryptedData, nonce, sharedSecret);
    if (!decrypted) return null;
    return JSON.parse(new TextDecoder().decode(decrypted));
  }

  return null;
};

const nonce = nacl.randomBytes(24);
export const getEncryptedPayload = ({serialized, session}) => {
  if (!dappKeyPair) return null;

  return nacl.box.after(
  Buffer.from(JSON.stringify({ transaction: serialized, session })),
  nonce,
  sharedSecret!  // ← already the computed shared secret, no need for phantomPublicKey separately
);
};

export const createURLSearchParams = ({encryptedPayload}) =>{
    if (!dappKeyPair) return null;

    return new URLSearchParams({
  dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
  nonce: bs58.encode(nonce),
  redirect_link: Linking.createURL("/transaction"),
  payload: bs58.encode(encryptedPayload),
})

}