const { Octokit } = require("@octokit/rest");
const fs = require("fs");
var argv = require('minimist')(process.argv.slice(2));

const configJson = fs.readFileSync(argv.source);
const config = JSON.parse(configJson);

showObjectProperties(config, '');

async function showObjectProperties(object, objectPath) {
    for (const property in object) {
        if (isObject( object[property] ))
        {
            let objectFullPath = objectPath ? `${objectPath}__` : '';
            showObjectProperties(object[property], `${objectFullPath}${property}`);
        }
        else{

            await CreateSecret(`${objectPath}__${property}`, `${object[property]}`);

            console.log(`${objectPath}__${property}: ${object[property]}`);
        }
    }
}

function isObject(a) {
    return (!!a) && (a.constructor === Object);
};

async function CreateSecret(secretName, secretValue) {
    const octokit = new Octokit({
        auth: 'GITHUB AUTH KEY'
    })

    const publicKey = await octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key', {
        repository_id: 'REPO ID',
        environment_name: 'ENV NAME'
    })

    const encrypted = await Encrypt(secretValue, publicKey.data.key);

    await octokit.request('PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}', {
        repository_id: 'REPO ID',
        environment_name: 'ENVIRONMENT NAME',
        secret_name: secretName,
        encrypted_value: encrypted,
        key_id: publicKey.data.key_id
      })
 }

 async function Encrypt(text, key) {
    const sodium = require('libsodium-wrappers');
    const encrypted = await sodium.ready.then(() => {
        let binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL)
        let binsec = sodium.from_string(text)
      
        let encBytes = sodium.crypto_box_seal(binsec, binkey)
      
        let output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL)
      
        return output;
      });
  
      return encrypted;
 }
