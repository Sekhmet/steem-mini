# Steem Mini

Tiny Steem library - batteries not included

## Getting Started

Steem Mini is a minimal library for interacting with Steem nodes via HTTP JSON RPC.
It is designed to be 1KB in size and work in browser and server.
You have freedom of sending any message you want.

### Installing

#### Install using npm or yarn
```
npm install steem-mini
```
or
```
yarn add steem-mini
```

#### Obtain development copy

```
git clone https://github.com/Sekhmet/steem-mini.git
cd steem-mini
npm install
```

## Usage
```js
// using UMD (browser)
const client = window.SteemMini.createClient('https://api.steemit.com');

// using CommonJS
const createClient = require('steem-mini').createClient;
const client = createClient('https://api.steemit.com');

// using ES6 modules
import { createClient } from 'steem-mini';
const client = createClient('https://api.steemit.com');

// sending requests
const message = {
  method: 'get_accounts',
  jsonrpc: '2.0',
  params: [usernames]
};

client.send(message, function(err, result) {
  if (err !== null) console.error(err);
  console.log('response', result);
});
```

## Running the tests

You can run lint and tests using npm script

```
npm run test
```


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Sekhmet/steem-mini).

## Authors

* **Wiktor Tkaczyński** - [Sekhmet](https://github.com/Sekhmet)

See also the list of [contributors](https://github.com/Sekhmet/steem-mini/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
