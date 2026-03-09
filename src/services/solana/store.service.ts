
import { PublicKey } from "@solana/web3.js";
import { connection } from "./connection";
import { PROGRAM_ID } from "./solana";
import { decodeMenuItem } from "./decodedMenuItems";
import { MenuItem } from "@/types";

const PROGRAM_ID_KEY = new PublicKey(PROGRAM_ID);

export const fetchMenuItemsByShop = async (
  shopAddress: string
): Promise<MenuItem[]> => {
  const programId = new PublicKey(PROGRAM_ID);

  const accounts = await connection.getProgramAccounts(programId, {
    filters: [
      {
        memcmp: {
          offset: 8,
          bytes: shopAddress,
        },
      },
    ],
  });

  return accounts.map((acc) => ({
    id: acc.pubkey.toBase58(),
    ...decodeMenuItem(acc.account.data),
  }));
};