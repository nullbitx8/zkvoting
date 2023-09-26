import {Identity} from "@semaphore-protocol/identity"
import {Contract, ethers, Wallet} from "ethers";
import 'dotenv/config'
import {randUnit256, store_group_id, store_secrets} from "./lib.mjs";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
const admin_wallet = new Wallet(process.env.ADMIN_KEY, provider);

const semaphore = new Contract(
    "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131",
    [
        "function createGroup(uint256 groupId, uint256 merkleTreeDepth, address admin) external",
        "function addMembers(uint256 groupId, uint256[] identityCommitments) external",
    ],
    admin_wallet
);

console.log("Creating group...")

const group_id = randUnit256();
const merkle_tree_depth = 16;

await (
    await semaphore.functions.createGroup(
        group_id,
        merkle_tree_depth,
        admin_wallet.address
    )
).wait();

store_group_id(group_id.toString());

console.log("Adding identities...")

for (let i = 0; i < 10; i++) {
    const secrets = [];
    const commitments = [];
    for (let n = 0; n < 25; n++) {
        const secret = randUnit256().toString();
        secrets.push(secret);
        const {commitment} = new Identity(secret);
        commitments.push(commitment);
    }
    await (
        await semaphore.functions.addMembers(group_id, commitments)
    ).wait();
    store_secrets(secrets);
}

console.log("Done");