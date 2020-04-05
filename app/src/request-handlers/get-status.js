const nwnStatusRequest = require('../util/nwn-status-request');

const port = process.env.NWN_PORT;
const host = process.env.NWN_HOST;

module.exports = (request, response) => {
  nwnStatusRequest({
    port,
    host
  }).catch(() => {
    response.status(500).json({ error: 'INTERNAL_SERVER_ERROR'});
  }).then((successData) => {
    response.json(successData);
  });
};