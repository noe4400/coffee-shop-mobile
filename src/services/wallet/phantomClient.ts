import nacl from "tweetnacl";
import bs58 from "bs58";
import * as Linking from "expo-linking";
import { PHANTOM_CONNECT_URL, PHANTOM_SIGN_AND_SEND_URL, SOLANA_NETWORK } from "../solana/solana";
import type { WalletSession } from "@/services/wallet/types";

// ─── Connect ──────────────────────────────────────────────────────────────────

export const buildConnectURL = (dappKeyPair: nacl.BoxKeyPair): string => {
  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    cluster: SOLANA_NETWORK,
    redirect_link: Linking.createURL("/"),
    app_url: Linking.createURL("/"),
  });
  return `${PHANTOM_CONNECT_URL}?${params.toString()}`;
};

export const openPhantomConnect = async (dappKeyPair: nacl.BoxKeyPair): Promise<void> => {
  const url = buildConnectURL(dappKeyPair);
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) throw new Error("Phantom wallet is not installed");
  await Linking.openURL(url);
};

// ─── Decrypt ──────────────────────────────────────────────────────────────────

type DecryptConnectResult = {
  public_key: string;
  session: string;
};

/**
 * Decrypts the connect callback from Phantom.
 * Returns the decrypted payload + the computed sharedSecret for future use.
 */
export const decryptConnectPayload = (
  queryParams: Record<string, string>,
  dappKeyPair: nacl.BoxKeyPair
): { payload: DecryptConnectResult; sharedSecret: Uint8Array; phantomPublicKey: Uint8Array } | null => {
  if (queryParams.errorCode) {
    console.warn("Phantom connect error:", queryParams.errorMessage);
    return null;
  }

  const { phantom_encryption_public_key, nonce, data } = queryParams;
  if (!phantom_encryption_public_key || !nonce || !data) return null;

  const phantomPublicKey = bs58.decode(phantom_encryption_public_key);
  const sharedSecret = nacl.box.before(phantomPublicKey, dappKeyPair.secretKey);
  const decrypted = nacl.box.open.after(bs58.decode(data), bs58.decode(nonce), sharedSecret);

  if (!decrypted) return null;

  return {
    payload: JSON.parse(new TextDecoder().decode(decrypted)) as DecryptConnectResult,
    sharedSecret,
    phantomPublicKey,
  };
};

/**
 * Decrypts any subsequent callback (sign, signAndSend, etc.)
 * Reuses the sharedSecret established at connect time.
 */
export const decryptCallbackPayload = <T = Record<string, unknown>>(
  queryParams: Record<string, string>,
  sharedSecret: Uint8Array
): T | null => {
  if (queryParams.errorCode) {
    console.warn("Phantom callback error:", queryParams.errorMessage);
    return null;
  }

  const { nonce, data } = queryParams;
  if (!nonce || !data) return null;

  const decrypted = nacl.box.open.after(bs58.decode(data), bs58.decode(nonce), sharedSecret);
  if (!decrypted) return null;

  return JSON.parse(new TextDecoder().decode(decrypted)) as T;
};

// ─── Encrypt (for transactions) ───────────────────────────────────────────────

type EncryptedPayload = {
  encryptedData: Uint8Array;
  nonce: Uint8Array;
};

export const encryptPayload = (
  payload: object,
  sharedSecret: Uint8Array
): EncryptedPayload => {
  // Fresh nonce per call — never reuse
  const nonce = nacl.randomBytes(24);
  const encryptedData = nacl.box.after(
    Buffer.from(JSON.stringify(payload)),
    nonce,
    sharedSecret
  );
  return { encryptedData, nonce };
};

// ─── Build transaction URL ────────────────────────────────────────────────────

export const buildSignAndSendURL = (
  serializedTransaction: string,
  walletSession: WalletSession,
  dappKeyPair: nacl.BoxKeyPair,
  redirectPath = "/transaction"
): string => {
  const { encryptedData, nonce } = encryptPayload(
    { transaction: serializedTransaction, session: walletSession.session },
    walletSession.sharedSecret
  );

  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    nonce: bs58.encode(nonce),
    redirect_link: Linking.createURL(redirectPath),
    payload: bs58.encode(encryptedData),
  });

  return `${PHANTOM_SIGN_AND_SEND_URL}?${params.toString()}`;
};