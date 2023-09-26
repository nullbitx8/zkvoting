import QRCode from 'qrcode';
import fs from "fs";

const SECRETS_FILE = "./scripts/secrets.json";

const existing_json = fs.readFileSync(SECRETS_FILE, "utf8")
const existing_secrets = JSON.parse(existing_json);
console.log(existing_secrets[0]);

let identity = 0;
for (let i = 0; i < existing_secrets.length ; i ++) {
    identity = identity + 1
    QRCode.toFile(`./scripts/QR_CODES/${identity}.png`, existing_secrets[i], {
        errorCorrectionLevel: 'H'
      }, function(err) {
        if (err) throw err;
        console.log('QR code saved!');
      });
}