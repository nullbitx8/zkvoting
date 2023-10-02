import 'dotenv/config'
import fetch from "node-fetch";

const query = `
{
  verifiedProofs(
    where: {
      group: "7875425585973306980145033760805688508464697150823289326627982781683471315540"
    }
  ) {
    signal
  }
}`;

const results = await fetch("https://api.studio.thegraph.com/proxy/14377/semaphore-mumbai/v3.6.1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: query
  }),
})
  .then(r => r.json())

const items = results.data.verifiedProofs;

// { 1: 10, 2: 5, 3: 15 }
const votes = {};

for (const item of items) {
  const signal_binary = Number(item.signal).toString(2);

  let remaining = signal_binary;
  while (remaining.length > 0) {
    const byte_value = parseInt(remaining.slice(-8), 2);
    remaining = remaining.slice(0, -8);
    const byte_project = parseInt(remaining.slice(-8), 2);
    remaining = remaining.slice(0, -8);

    if (byte_project in votes) {
      votes[byte_project] += byte_value
    } else {
      votes[byte_project] = byte_value
    }
  }

  console.log(votes)

}

console.log("Done");