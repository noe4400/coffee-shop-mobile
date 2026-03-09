import { PublicKey } from "@solana/web3.js";

export const decodeMenuItem = (data: Buffer) => {
  let offset = 8; // skip Anchor discriminator

  const shop = new PublicKey(data.slice(offset, offset + 32)).toBase58();
  offset += 32;

  const nameLength = data.readUInt32LE(offset);
  offset += 4;

  const name = data.slice(offset, offset + nameLength).toString();
  offset += nameLength;

  const price = Number(data.readBigUInt64LE(offset));
  offset += 8;

  const available = data[offset] === 1;

  return {
    shop,
    name,
    price,
    available,
  };
};