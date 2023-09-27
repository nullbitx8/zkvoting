import {SemaphoreEthers} from "@semaphore-protocol/data"
import {Identity} from "@semaphore-protocol/identity"
import 'dotenv/config'
import {generateProof} from "@semaphore-protocol/proof";
import {Group} from "@semaphore-protocol/group";
import {load_group_id} from "./lib.mjs";

const semaphoreData = new SemaphoreEthers(process.env.RPC, {
  address: process.env.CONTRACT
})

const secret = "83970237314410118042224507424620835103693673121703173001730395156723829192572";
const signal = "55913308326943162161974572271060082063423079659240540471751403101436616302030";

const group_id = load_group_id();
const commitments = await semaphoreData.getGroupMembers(group_id.toString());
console.log(commitments);
const group = new Group(group_id.toString(), 16, commitments);
const identity = new Identity(secret);

const fullProof = await generateProof(
  identity,
  group,
  group.root,
  signal, {
    zkeyFilePath: "./semaphore.zkey",
    wasmFilePath: "./semaphore.wasm"
  }
)

//await (
//  await semaphore.functions.verifyProof(
//    group_id,
//    fullProof.merkleTreeRoot,
//    fullProof.signal,
//    fullProof.nullifierHash,
//    fullProof.externalNullifier,
//    fullProof.proof
//  )
//).wait();











console.log("Done")