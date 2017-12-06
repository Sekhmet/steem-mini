import 'isomorphic-fetch';

/**
 * Creates new Steem client.
 *
 * @param {String} address Address of the JSON RPC (HTTP) server.
 * @returns {Client} Steem client that you can use for sending and receiving data.
 */
export default function createClient(address) {
  let nextRequestId = 0;

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

    fetch(address, {
      body: JSON.stringify(request),
      method: 'post',
      mode: 'cors',
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error) throw new Error('Response contains error', res.error);
        if (!res.result) throw new Error('Response doesn\'t contain result');
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
