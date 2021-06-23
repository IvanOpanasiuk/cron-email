const config = require("config");
const { getMessagesByRoomName } = require("./service/get_messages");
const baseUrl = config.get("service_settings.base_url");
const delayDay = config.get("service_settings.delay_day");
const now = new Date().getTime();

const dateComparison = (ts) => Math.ceil(Math.abs(now - Date.parse(ts)) / (1000 * 3600 * 24)) <= delayDay;

const isFreshMessaged = (messages) => messages.filter((m) => dateComparison(m.ts) && !m.t && (!!m.msg || m.attachments));

module.exports.worker = async () => {
  const payload = [];
    const room_names = config.get("api_settings.room_names");
    for (const name of room_names) {
      try {
        const response = await getMessagesByRoomName(name);
        console.log(response.data, 'data');
        if (response.status === 200) {
          const { messages } = response.data;
          const freshMessages = isFreshMessaged(messages);
          if (freshMessages.length) {
            payload.push({
              name,
              messages: freshMessages,
              link: `${baseUrl}/channel/${name}`,
            });
          }
        }
      } catch (error) {
        console.log(error.message, "Name doesn't exist");
      }
    }
    return payload;
};
