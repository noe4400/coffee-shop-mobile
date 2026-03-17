
import { PublicKey } from "@solana/web3.js";
import { connection } from "./connection";
import { PROGRAM_ID } from "./solana";
import { decodeMenuItem } from "./decodedMenuItems";
import { MenuItem } from "@/types";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

export const fetchMenuItemsByShop = async (
  shopAddress: string
): Promise<MenuItem[]> => {
  const programId = new PublicKey(PROGRAM_ID);

  // MenuItem discriminator from your IDL: [225, 148, 239, 174, 246, 128, 31, 0]
  const menuItemDiscriminator = Buffer.from([225, 148, 239, 174, 246, 128, 31, 0]);

  const accounts = await connection.getProgramAccounts(programId, {
    filters: [
      {
        memcmp: {
          offset: 0, // discriminator is at offset 0
          bytes: bs58.encode(menuItemDiscriminator),
        },
      },
      {
        memcmp: {
          offset: 8, // shop pubkey comes after 8-byte discriminator
          bytes: shopAddress,
        },
      },
    ],
  });

  console.log("Fetched menu items:", accounts);
  return accounts.map((acc) => ({
    id: acc.pubkey.toBase58(),
    ...decodeMenuItem(acc.account.data),
  }));
};