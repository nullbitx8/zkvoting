import {randomBytes} from 'crypto';
import fs from "fs";

const SECRETS_FILE = "./secrets.json";
const COMMITMENTS_FILE = "./commitments.json";
const GROUP_ID_FILE = "./group_id.json";

export const randUnit256 = () => {
  const value = randomBytes(32);
  return BigInt(`0x${value.toString('hex')}`);
}

export const store_secrets = (secrets) => {
  if (!fs.existsSync(SECRETS_FILE)) {
    dump_json(JSON.stringify(secrets), SECRETS_FILE);
    console.log("Secrets saved");
    return
  }

  const existing_json = fs.readFileSync(SECRETS_FILE, "utf8")
  const existing_secrets = JSON.parse(existing_json);
  const final_secrets = [
    ...existing_secrets,
    ...secrets
  ]
  dump_json(JSON.stringify(final_secrets), SECRETS_FILE);
  console.log("Secrets saved");
}

export const store_group_id = (group_id) => {
  dump_json(group_id, GROUP_ID_FILE);
}

export const load_group_id = () => {
  return BigInt(fs.readFileSync(GROUP_ID_FILE));
}

const dump_json = (contents, file) => {
  fs.writeFileSync(file, contents, "utf8");
}