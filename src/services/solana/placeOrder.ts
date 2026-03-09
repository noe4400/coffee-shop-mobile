import { PublicKey, SystemProgram } from "@solana/web3.js";
import { connection } from "./connection";
import { program } from "./program";
import BN from "bn.js";

export const buildPlaceOrderTransaction = async (
  publicKey: PublicKey,
  cartItems: any[]
) => {

  if (!cartItems.length) {
    throw new Error("Cart is empty");
  }
  console.log("Building transaction for cart items:", cartItems[0].shop);

  // 1️⃣ shop PDA comes from items
  const coffeeShopPda = new PublicKey(cartItems[0].shop);

  // 2️⃣ fetch coffee shop account
  const coffeeShop =
    await program.account.coffeeShop.fetch(coffeeShopPda);

  const ownerPubkey = coffeeShop.owner;
  const totalOrders = coffeeShop.totalOrders; // already BN

  // 3️⃣ derive order PDA
  const [orderPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("order"),
      coffeeShopPda.toBuffer(),
      totalOrders.toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  // 4️⃣ convert cart items
  const orderItems = cartItems.map((item) => ({
    shop: new PublicKey(item.shop),
    menuItem: new PublicKey(item.id),   // camelCase here
    price: new BN(item.price * 1_000_000_000),
    quantity: item.quantity,
  }));

  // 5️⃣ build transaction
  const tx = await program.methods
    .placeOrder(orderItems)
    .accounts({
      coffee_shop: coffeeShopPda,
      order: orderPda,
      customer: publicKey,
      owner: ownerPubkey,
      system_program: SystemProgram.programId,
    })
    .transaction();

  // 6️⃣ finalize transaction
  tx.feePayer = publicKey;

  const { blockhash } =
    await connection.getLatestBlockhash();

  tx.recentBlockhash = blockhash;

  return tx;
};