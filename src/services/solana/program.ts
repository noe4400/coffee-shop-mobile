import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "@/idl/coffe.json";

const programId = new PublicKey("8QNsjr6drj8ptAAmrZybaubn2U91xRY93taqobuU43G8");

const provider = AnchorProvider.env();

export const program = new Program(idl as any, programId, provider);