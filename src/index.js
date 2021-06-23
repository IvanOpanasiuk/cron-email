const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const config = require("config");
const mongoose = require("mongoose");

const { worker } = require("./worker");
const { connect } = require("./db/db_handler");
const { sendMail } = require("./send_mail");

const port = config.get("service_settings.port") || 5005;

app = express();

async function start() {
  try {
    // await connect();
    app.listen(port, () => {
      console.log(`Server has been started on port ${port}`);
    });

    // cron.schedule("0 0 10 * * 2", async function () {
    cron.schedule("* * * * *", async function () {
      try {
        const data = await worker();
        await sendMail(data);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start();
