import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "@/idl/coffe.json";
import { connection } from "./connection";

const programId = new PublicKey(
  "8QNsjr6drj8ptAAmrZybaubn2U91xRY93taqobuU43G8"
);



// dummy wallet because Phantom signs later
const wallet = {
  publicKey: null,
  signTransaction: async (tx: any) => tx,
  signAllTransactions: async (txs: any) => txs,
};

const provider = new AnchorProvider(connection, wallet as any, {});

export const program = new Program(idl as any, programId, provider);