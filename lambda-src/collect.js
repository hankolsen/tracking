/* eslint-disable no-console */
import * as nodemailer from 'nodemailer';

require('dotenv').config();

const sendMail = ({ e, p }) => {
  console.log('SendMail');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `${e} ${p} ${new Date().toLocaleString()}`,
    text: `${e}: ${p}`,
  }, (error) => {
    if (error) {
      console.log('[sendMail] Error:');
      console.log(error);
    } else {
      console.log('[sendMail] Ok');
    }
  });
};

exports.handler = (event, context, callback) => {
  const {
    queryStringParameters,
  } = event;

  // Expected querysting:
  // p = project name
  // e = event name
  // k = api key
  const {
    p,
    e,
    k = '',
  } = queryStringParameters;

  console.log(`p: ${p}`);
  console.log(`e: ${e}`);
  console.log(`k: ${k}`);

  if (k === process.env.API_KEY) {
    sendMail({ e, p });
  }

  callback(null, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
    statusCode: 200,
    body: '',
  });
};
