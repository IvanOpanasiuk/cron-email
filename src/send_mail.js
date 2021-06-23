const nodemailer = require('nodemailer');
const config = require('config');
const { digestEmail } = require('./emails/digest');

const user = config.get('email_settings.user') || '';
const pass = config.get('email_settings.pass') || '';

module.exports.sendMail = async (data) => {
  const templateEmail = digestEmail(data);
  let transporter = nodemailer.createTransport({
    host: 'smtp.ocs.ru',
    port: 587,
    secure: false,
    tls: {rejectUnauthorized: false},
    auth: {
      user,
      pass,
    },
  });

  let mailOption = {
    from: `Новости Rocket <${user}>`,
    // to: 'rocket-news@ocs.ru',
    // to: 'testiopanasyuk@gmail.com',
    to: 'iopanasyuk@ocs.ru',
    subject: 'Дайджест Rocket',
    html: templateEmail,
    attachments: [{
      filename: 'logo.png',
      path: __dirname +'/emails/logo.png',
      cid: 'logo'
    }]
  };

  if(Object.keys(data).length) {
    await transporter.sendMail(mailOption, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Email has been sent!');
      }
    });
  }
};
