import createTimeout from './utils/createTimeout';

let fetch;
if (typeof window !== 'undefined' && window.fetch) {
  ({ fetch } = window);
} else {
  fetch = require('cross-fetch'); // eslint-disable-line global-require
}

/**
 * Creates new Steem client.
 *
 * @param {String} address Address of the JSON RPC (HTTP) server.
 * @returns {Client} Steem client that you can use for sending and receiving data.
 */
export default function createClient(address, options = {}) {
  if (typeof options !== 'object') throw new Error('Options has to be an object');

  const clientOptions = {
    timeout: 5000,
    ...options,
  };

  let nextRequestId = 0;

  const fetchURL = request =>
    fetch(address, {
      body: JSON.stringify(request),
      method: 'post',
      mode: 'cors',
    });

  /**
   * Sends command to node
   * @param {Object} command Command to send
   * @param {Function} cb A callback that is called when response has been received
   * or request failed.
   */
  const send = (command, cb) => {
    const request = {
      id: nextRequestId,
      ...command,
    };
    nextRequestId += 1;

    createTimeout(clientOptions.timeout, fetchURL(request))
      .then(res => res.json())
      .then((res) => {
        if (res.error) throw new Error('Response contains error', res.error);
        if (!res.result) throw new Error("Response doesn't contain result");
        return res;
      })
      .then((res) => {
        cb(null, res.result);
        return res;
      })
      .catch(err => cb(err, null));
  };

  return { send };
}
