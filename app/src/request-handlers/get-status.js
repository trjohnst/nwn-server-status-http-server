const nwnStatusRequest = require('../util/nwn-status-request');

const port = process.env.NWN_PORT;
const host = process.env.NWN_HOST;

module.exports = async (request, response) => {
  try {
    const data = await nwnStatusRequest({
      port,
      host
    });
    response.json(data);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'INTERNAL_SERVER_ERROR'});
  }
};