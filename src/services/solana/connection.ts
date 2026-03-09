import { Connection, clusterApiUrl } from "@solana/web3.js";
import { SOLANA_NETWORK } from "./solana";

export const connection = new Connection(
  clusterApiUrl(SOLANA_NETWORK as Parameters<typeof clusterApiUrl>[0]),
  "confirmed"
);