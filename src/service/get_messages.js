const axios = require("axios");
const config = require("config");

const auth_token = config.get("service_settings.auth_token");
const user_id = config.get("service_settings.user_id");
const baseUrl = config.get("service_settings.base_url");

const option = {
  headers: {
    "X-Auth-Token": auth_token,
    "X-User-Id": user_id,
  },
};

module.exports.getMessagesByRoomName = async (name) => await axios.get(`${baseUrl}/api/v1/channels.messages?roomName=${name}`, option);
