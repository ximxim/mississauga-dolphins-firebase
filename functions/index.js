const GCF = require("firebase-functions");
const localConfig = require("./localConfig");

//MODULES
const updateNotificationPreference = require("./modules/production/UpdateNotificationPreference");
const registerPushDevice = require("./modules/production/RegisterPushDevice");
const getDeviceSettings = require("./modules/production/GetDeviceSettings");
const getNewsFeedModule = require("./modules/production/GetNewsFeed");
const slackListener = require("./modules/production/SlackListener");
const gameTrigger = require("./modules/production/GamesTrigger");
const recentFeed = require("./modules/production/RecentFeed");
const cheers = require("./modules/production/Cheers");
const view = require("./modules/production/View");

const config =
  process.env.PWD === "/user_code" ? functions.config() : localConfig();

exports.cheers = GCF.https.onRequest((req, res) => cheers(req, res, config));
exports.view = GCF.https.onRequest((req, res) => view(req, res, config));
exports.getNewsFeed = GCF.https.onRequest((req, res) =>
  getNewsFeedModule(req, res, config)
);
exports.slackListener = GCF.https.onRequest((req, res) =>
  slackListener(req, res, config)
);
exports.recentFeed = GCF.https.onRequest((req, res) =>
  recentFeed(req, res, config)
);
exports.registerPushDevice = GCF.https.onRequest((req, res) =>
  registerPushDevice(req, res, config)
);
exports.getDeviceSettings = GCF.https.onRequest((req, res) =>
  getDeviceSettings(req, res, config)
);
exports.updateNotificationPreference = GCF.https.onRequest((req, res) =>
  updateNotificationPreference(req, res, config)
);
exports.gamesPushNotificationsTrigger = GCF.database
  .ref("/Games")
  .onWrite((req, res) => gameTrigger(req, res, config));
