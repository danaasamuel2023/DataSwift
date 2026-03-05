# DataSwift - Owner's Guide
## Complete System Manual for Platform Management

---

## Table of Contents

1. What is DataSwift?
2. Getting Started (First-Time Setup)
3. Admin Dashboard Overview
4. Setting Up DataMart API (Data Provider)
5. Setting Up Paystack (Payments)
6. Setting Up SMS (mNotify)
7. Managing Pricing
8. Managing Users
9. Managing Transactions
10. Handling Withdrawals
11. Referral Program Setup
12. How Customers Use the Platform
13. How Agent Stores Work
14. Day-to-Day Operations Checklist
15. Troubleshooting Common Issues

---

## 1. What is DataSwift?

DataSwift is your online platform for selling mobile data bundles (MTN, Telecel, AirtelTigo) in Ghana. Here's what it does:

- **Customers** visit your website, create an account, deposit money into their wallet, and buy data bundles.
- **Agent Store Owners** can create their own branded store page, set custom prices, and earn profit on every sale.
- **Referral Program** rewards users who invite friends with cash commission and bonus data.
- **You (the Admin)** control everything: pricing, payments, withdrawals, and platform settings.

**How the money flows:**
1. Customer deposits money via Mobile Money or Card (through Paystack)
2. Customer buys data → money is deducted from their wallet
3. DataSwift sends the order to DataMart (your data provider) which delivers the data
4. You keep the difference between what you charge customers and what DataMart charges you

---

## 2. Getting Started (First-Time Setup)

### Step 1: Access the Admin Panel

1. Open your browser and go to your website (e.g., `https://dataswift.com`)
2. Click **"Log in"** at the top
3. Enter your admin email and password
4. You will be redirected to the **Admin Panel**

> **Important:** Your developer will create your first admin account. Keep your login details safe.

### Step 2: Configure the 3 Essential Services

Before your platform can work, you need to set up three services in **Settings**:

| Service | What It Does | You Need |
|---------|-------------|----------|
| DataMart API | Delivers the actual data bundles | API URL + API Key from DataMart |
| Paystack | Processes payments (MoMo & Card) | Secret Key + Public Key from Paystack |
| mNotify (SMS) | Sends OTPs and notifications | API Key + Sender ID from mNotify |

---

## 3. Admin Dashboard Overview

When you log into the admin panel, you'll see the **Overview** page with:

- **Total Users** — How many people have registered
- **Total Orders** — How many data purchases have been made
- **Revenue** — Total money collected from purchases
- **Deposits** — Total money deposited by users
- **Recent Orders** — The latest data purchases with status

### Admin Menu (Left Sidebar):

| Menu Item | What It Does |
|-----------|-------------|
| Overview | Platform stats at a glance |
| Users | View and manage all registered users |
| Transactions | View all deposits, purchases, refunds |
| Withdrawals | Approve or reject agent withdrawal requests |
| Pricing | Set how much you charge for each data bundle |
| Referrals | Configure the referral reward program |
| Settings | Set up DataMart, Paystack, SMS, and withdrawal rules |

---

## 4. Setting Up DataMart API (Data Provider)

DataMart is the service that actually delivers data bundles to phone numbers. You need a Reseller account with DataMart.

### How to Set Up:

1. Go to **Settings** in the admin panel
2. Find the **"DataMart API"** section
3. Enter:
   - **API URL** — The DataMart API address (your developer or DataMart support will give you this, e.g., `https://api.datamartgh.com`)
   - **API Key** — Your secret API key from DataMart
4. Click **"Test Connection"** — If it says **"Connected"**, you're good!
5. Click **"Save All"** at the top

### After Connecting DataMart:

1. Go to **Pricing** in the admin panel
2. Click **"Sync from DataMart"** — This pulls all available data bundles and their costs
3. Now set your selling prices (see Section 7)

> **If the connection test fails:** Double-check your API URL and API Key. Contact DataMart support if the issue persists.

---

## 5. Setting Up Paystack (Payments)

Paystack handles all money coming into the platform (customer deposits via MoMo and card).

### How to Get Paystack Keys:

1. Go to `https://dashboard.paystack.com` and sign in (or create a business account)
2. Go to **Settings → API Keys & Webhooks**
3. Copy your **Secret Key** (starts with `sk_live_...`)
4. Copy your **Public Key** (starts with `pk_live_...`)

### How to Set Up in DataSwift:

1. Go to **Settings** in the admin panel
2. Find the **"Paystack"** section
3. Paste your **Secret Key** and **Public Key**
4. Click **"Save All"**

> **Important:** Use your **LIVE** keys for real money, not test keys.

---

## 6. Setting Up SMS (mNotify)

SMS is used for sending password reset codes to users.

### How to Set Up:

1. Create an account at `https://mnotify.com`
2. Get your **API Key** from mNotify dashboard
3. In DataSwift **Settings**, find the **"SMS (mNotify)"** section
4. Enter your **API Key** and **Sender ID** (e.g., "DataSwift")
5. Click **"Save All"**

---

## 7. Managing Pricing

This is where you control how much money you make. The concept is simple:

- **Base Price (Cost)** = What DataMart charges YOU
- **Selling Price** = What you charge YOUR CUSTOMERS
- **Your Profit** = Selling Price minus Base Price

### How to Set Prices:

1. Go to **Pricing** in the admin panel
2. First, click **"Sync from DataMart"** to get the latest base prices
3. You'll see a table with three columns per network (MTN, Telecel, AirtelTigo):

| Bundle | Cost (DataMart) | Your Selling Price | Your Margin |
|--------|----------------|-------------------|-------------|
| 1GB | GH₵4.50 | [You type here] | Shows profit |
| 2GB | GH₵8.00 | [You type here] | Shows profit |
| 5GB | GH₵20.00 | [You type here] | Shows profit |

4. Type your selling price for each bundle
5. The **Margin** column shows your profit per sale (green = profit, red = loss)
6. Click **"Save"**

### Tips for Pricing:
- Add GH₵1-3 markup per bundle for healthy profit
- Check competitor prices to stay competitive
- You can update prices anytime
- Click "Sync from DataMart" periodically if DataMart changes their prices

### Example:

If DataMart charges you **GH₵8** for 2GB MTN data, and you set selling price to **GH₵10**:
- Customer pays: GH₵10
- DataMart charges you: GH₵8
- **Your profit: GH₵2 per sale**

---

## 8. Managing Users

### Viewing Users:

1. Go to **Users** in the admin panel
2. You'll see a table of all registered users with:
   - Name and email
   - Phone number
   - Wallet balance
   - Role (user or admin)
   - Join date

3. Use the **search bar** to find specific users by name, email, or phone

### What You Can See:
- How many users have registered
- Which users have money in their wallet
- Who joined recently

---

## 9. Managing Transactions

### Viewing Transactions:

1. Go to **Transactions** in the admin panel
2. You'll see ALL platform transactions:
   - **Deposits** — Money added to wallets (via Paystack)
   - **Purchases** — Data bought by users
   - **Refunds** — Money returned for failed orders
   - **Withdrawals** — Agent store cashouts

3. Use the **filter buttons** to show only one type
4. Use the **search bar** to find specific transactions

### Understanding Transaction Status:

| Status | Meaning |
|--------|---------|
| Completed | Transaction finished successfully |
| Pending | Waiting to be processed |
| Failed | Something went wrong |

---

## 10. Handling Withdrawals

When agents sell data through their stores, they earn profit. They can request to withdraw this profit to their MoMo account. **You must manually approve or reject these requests.**

### How to Process Withdrawals:

1. Go to **Withdrawals** in the admin panel
2. You'll see **Pending Requests** at the top
3. For each request, you'll see:
   - Agent's name
   - Amount requested
   - MoMo network and number
   - Account name

### To Approve a Withdrawal:
1. **Send the money** to the agent's MoMo number using your own MoMo
2. Click the green **"Approve"** button
3. The withdrawal is marked as completed

### To Reject a Withdrawal:
1. Click the red **"Reject"** button
2. Type a reason (e.g., "Invalid MoMo number" or "Please verify account name")
3. The money is returned to the agent's pending balance

> **Important:** Always send the MoMo payment BEFORE clicking Approve. Once approved, you cannot undo it.

---

## 11. Referral Program Setup

The referral program encourages users to invite friends. When a referred user buys data, the referrer earns a commission.

### How to Configure:

1. Go to **Referrals** in the admin panel
2. **Enable/Disable** — Toggle the referral program on or off
3. **Commission (%)** — Set the percentage of each purchase the referrer earns

   Example: If commission is **5%** and a referred user buys GH₵10 data, the referrer earns **GH₵0.50**

4. **Bonus Data Milestones** — Set data rewards for reaching referral milestones. This is in JSON format:

```
[
  {"referralCount": 5, "bonusGB": 1},
  {"referralCount": 10, "bonusGB": 3},
  {"referralCount": 25, "bonusGB": 10}
]
```

This means:
- Refer 5 people → Get 1GB bonus data
- Refer 10 people → Get 3GB bonus data
- Refer 25 people → Get 10GB bonus data

5. Click **"Save"**

### How Users Use Referrals:
- Every user gets a unique referral code (e.g., "KOF1AB")
- They share a link like: `https://yoursite.com/sign-up?ref=KOF1AB`
- When someone signs up with that link, they become a referral
- The referrer earns commission on every purchase the referred person makes

---

## 12. How Customers Use the Platform

Here's what your customers experience:

### Registration:
1. Go to your website
2. Click "Get Started" or "Sign Up"
3. Enter name, email, phone, password
4. (Optional) Enter a referral code
5. Account is created instantly

### Buying Data:
1. Log in → Go to **Dashboard**
2. Click **"Buy Data"** or choose a network from Quick Buy
3. Select network (MTN, Telecel, or AirtelTigo)
4. Choose a bundle (e.g., 2GB for GH₵10)
5. Enter the phone number to receive the data
6. Confirm purchase
7. Data is delivered within seconds to minutes

### Depositing Money:
1. Go to **Wallet**
2. Click **"Deposit"**
3. Enter amount (or click a quick amount like GH₵10, GH₵20, etc.)
4. Click **"Pay with Paystack"**
5. Complete payment via MoMo or Card on Paystack's page
6. Money is added to wallet instantly after payment

### Checking History:
- **Transactions** page shows all deposits, purchases, and refunds
- Users can search and filter their transaction history

---

## 13. How Agent Stores Work

Any user can create their own data store and earn money by selling data at their own prices.

### How an Agent Sets Up a Store:
1. Log in → Click **"Agent Store"** in the sidebar
2. Click **"Create Store"**
3. Enter store name, description, contact phone
4. Choose a theme color
5. Enter MoMo withdrawal details
6. Store is created with a unique link (e.g., `yoursite.com/shop/kofis-data-hub`)

### How an Agent Sets Prices:
1. Go to **Store → Products**
2. For each network and bundle, enter a custom selling price
3. The agent's profit = their price minus the base price
4. Click **"Save"**

### How a Customer Buys from a Store:
1. Visit the store link (e.g., `yoursite.com/shop/kofis-data-hub`)
2. Select network → Choose bundle → Enter phone number
3. Pay via Paystack (MoMo or Card)
4. Data is delivered

### How the Money Works:
- Customer pays the agent's price via Paystack
- DataSwift fulfills the order via DataMart at base cost
- The profit goes to the agent's store balance
- Agent can request withdrawal to their MoMo (you approve it)

### Example:
- Base price for 2GB MTN: GH₵8
- Agent sells it for: GH₵12
- Customer pays: GH₵12
- DataMart cost: GH₵8
- **Agent's profit: GH₵4**
- Agent withdraws to MoMo → You approve and send

---

## 14. Day-to-Day Operations Checklist

### Every Day:
- [ ] Check **Withdrawals** for pending requests → Approve/Reject
- [ ] Check **Overview** dashboard for unusual activity
- [ ] Glance at **Transactions** for any failed orders

### Every Week:
- [ ] Review **Users** list for growth
- [ ] Check your DataMart account balance (make sure you have funds)
- [ ] Review agent store activity

### Every Month:
- [ ] Click **"Sync from DataMart"** in Pricing to catch any price changes
- [ ] Review and adjust your selling prices if needed
- [ ] Check referral program performance
- [ ] Review your Paystack dashboard for payment summaries

### Occasionally:
- [ ] Update your Paystack keys if you rotate them
- [ ] Check mNotify SMS balance
- [ ] Review withdrawal fee settings

---

## 15. Troubleshooting Common Issues

### "Customers say data is not delivered"
1. Go to **Transactions** and find the order
2. Check the status:
   - **Pending/Processing** → The order is still being processed. Wait a few minutes.
   - **Failed** → The order failed. The customer should have been refunded automatically.
   - **Completed** → DataMart says it was delivered. Ask the customer to check again or contact DataMart.

### "DataMart connection test fails"
1. Go to **Settings**
2. Double-check the API URL and API Key — no extra spaces
3. Make sure your DataMart Reseller account is active
4. Contact DataMart support if it still fails

### "Customers can't make deposits"
1. Check your Paystack keys in **Settings** — make sure they're LIVE keys
2. Log into Paystack dashboard and check for any issues
3. Make sure your Paystack account is fully verified

### "Prices show GH₵0 or bundles are missing"
1. Go to **Pricing**
2. Click **"Sync from DataMart"** to refresh base prices
3. Make sure you've entered selling prices for each bundle
4. Click **"Save"**

### "Agent says withdrawal was approved but no money received"
1. Check your MoMo transaction history
2. Verify the agent's MoMo number is correct
3. If you haven't sent the money yet, do so immediately
4. If MoMo transaction failed, contact your MoMo provider

### "A user wants a refund"
- For failed orders: Refunds happen automatically
- For other cases: You cannot refund directly through the admin panel. Contact your developer to manually adjust the user's wallet balance.

### "I want to change a user to admin"
- Currently this needs to be done by your developer in the database
- Contact your developer and provide the user's email

---

## Quick Reference: Important URLs

| Page | URL |
|------|-----|
| Main Website | `https://yoursite.com` |
| Login | `https://yoursite.com/sign-in` |
| Admin Panel | `https://yoursite.com/admin` |
| Example Store | `https://yoursite.com/shop/store-name` |

---

## Quick Reference: Platform Fees & Earnings

| Item | Description |
|------|-------------|
| Your Revenue | Selling Price − DataMart Cost per order |
| Agent Revenue | Agent's Selling Price − Base Price per order |
| Referral Cost | Commission % of each purchase by referred users |
| Paystack Fee | ~1.95% per deposit (charged by Paystack) |
| Withdrawal Fee | Configurable in Settings (you set the %) |

---

## Need Help?

If you encounter any issues not covered in this guide, contact your developer. When reporting an issue, include:

1. What you were trying to do
2. What happened instead
3. Any error messages you saw
4. The date and time it happened
5. Screenshots if possible

---

*DataSwift Platform — Owner's Guide v1.0*
