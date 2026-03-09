# ☕ Coffee Shop Mobile

A **React Native mobile application** that connects to a **Solana
on-chain coffee shop program**. The app allows users to browse items
from a specific on-chain coffee shop and pay for them using a **Phantom
wallet**.

This project demonstrates how a **mobile app interacts with a Solana
program**, retrieves on-chain data, and performs payments with **wallet
authorization handled by Phantom**.

------------------------------------------------------------------------

# 🚀 Features

-   📱 React Native mobile client
-   🔗 Connects directly to a **Solana program**
-   ☕ Fetches items from an on-chain **coffee shop account**
-   👛 Phantom wallet connection
-   💳 Pay for items using SOL
-   🔐 Transaction authorization handled inside **Phantom**
-   ⚡ Built with **Expo**

------------------------------------------------------------------------

# 🏗 Architecture

    Mobile App (React Native / Expo)
            │
            │ Solana RPC
            ▼
    Solana Program (coffee-shop-solana)
            │
            │ stores
            ▼
    Coffee Shop Account
            │
            ▼
    Items (name, price, etc)

Flow:

1.  App connects to **Solana devnet**
2.  Retrieves the **coffee shop account**
3.  Fetches the list of available items
4.  User connects **Phantom wallet**
5.  User selects items
6.  App builds a **transaction**
7.  Phantom opens to **authorize the transaction**
8.  Transaction is sent to Solana

------------------------------------------------------------------------

# 📦 Tech Stack

-   React Native
-   Expo
-   Solana Web3.js
-   Phantom Wallet (Mobile Deep Linking)

------------------------------------------------------------------------

# 📋 Requirements

-   Node.js
-   Expo CLI
-   iOS or Android device
-   Phantom Wallet installed on the device

⚠️ Phantom wallet **cannot be tested properly in a simulator/emulator**.
You must run the app on a **physical device**.

------------------------------------------------------------------------

# ⚙️ Installation

Clone the repository:

    git clone https://github.com/yourusername/coffee-shop-mobile.git
    cd coffee-shop-mobile

Install dependencies:

    npm install

------------------------------------------------------------------------

# ▶️ Running the App

Because the app needs to interact with **Phantom wallet**, it must run
on a **physical device**.

First generate the native project:

    npx expo prebuild

Then run on your device:

    npx expo run:ios --device

or

    npx expo run:android --device

This allows the app to run alongside **Phantom wallet** on the same
device.

------------------------------------------------------------------------

# 👛 Phantom Wallet Integration

The app uses **Phantom mobile deep linking** to:

-   Connect a wallet
-   Request transaction approval
-   Send transactions to the Solana network

When the user initiates a payment:

1.  The app creates a Solana transaction
2.  Phantom opens automatically
3.  The user approves or rejects the transaction
4.  Phantom signs and sends the transaction

------------------------------------------------------------------------

# ☕ Coffee Shop Program

The mobile application interacts with a **Solana on-chain program**
responsible for managing the coffee shop logic, including shop accounts,
menu items, and payments.

The backend Solana program lives in this repository:

https://github.com/noe4400/coffee-shop-solana

This program stores the coffee shop data on-chain and exposes
instructions that the mobile app calls when retrieving items or
performing purchases.

### Responsibilities of the Solana Program

The program manages:

-   Coffee shop accounts
-   Item creation and storage
-   Pricing for each item
-   Order/payment handling

### Example Item Structure

    pub struct Item {
      pub name: String,
      pub price: u64
    }

Prices are stored in **lamports**, the smallest unit of SOL.

### Interaction Flow

1.  The mobile app connects to **Solana Devnet**
2.  It retrieves the **coffee shop account**
3.  The account contains the list of items available for purchase
4.  When the user pays, the mobile app creates a **transaction**
5.  Phantom wallet signs and submits the transaction to the program

------------------------------------------------------------------------

# 💳 Payment Flow

1️⃣ User selects an item\
2️⃣ App builds a **Solana transaction**\
3️⃣ Phantom wallet opens\
4️⃣ User approves payment\
5️⃣ Transaction is submitted to **Solana devnet**

![Payment Flow Example](assets/wallet-example.gif)
------------------------------------------------------------------------

# 🧪 Testing

Make sure:

-   Phantom wallet is installed
-   Phantom is set to **Devnet**
-   Your wallet has some SOL on Devnet (you can get free SOL from a faucet)
-   Your Solana program is deployed to **Devnet**



------------------------------------------------------------------------

# 📁 Project Structure

    coffee-shop-mobile
    │
    ├── src
    │   ├── components
    │   ├── screens
    │   ├── solana
    │   │   ├── connection.ts
    │   │   ├── program.ts
    │   │   └── transactions.ts
    │   └── wallet
    │
    ├── App.tsx
    └── package.json

------------------------------------------------------------------------

# 🔧 Environment

if you want to test it with your own Solana program, modify the src/services/solana/solana.ts file to point to your program ID and coffee shop account.
------------------------------------------------------------------------

# 📚 Resources

-   https://solana.com/docs
-   https://docs.phantom.app
-   https://expo.dev

------------------------------------------------------------------------

