const mongoose = require('mongoose');
const delay = require('delay');
const delayString = require('../utils/delayString');
require('dotenv').config();
// Connect to mongoDB
let reconnectTries = 0;
let trialDelay = 1;

const dbConnect = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        console.log('mongo connected');
      },
      (error) => {
        console.error(`mongodb connection error: ${error}`);
        reconnectTries += 1;
        console.log(`Reconnecting after ${delayString(trialDelay)}`);
        console.log(`Reconnect trial: ${reconnectTries}`);
        delay(trialDelay * 1000).then(() => {
          trialDelay += trialDelay;
          if (trialDelay > 7200) trialDelay = 7200;
          // enable recurtion
          dbConnect();
        });
      }
    )
    .catch((err) => console.error(`mongodb connection error: ${err}`));
};
module.exports = dbConnect;
