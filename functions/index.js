const functions = require('firebase-functions');
const localConfig = require('./localConfig');

// MODULES PRODUCTION
const updateNotificationPreference = require('./modules/production/UpdateNotificationPreference');
const registerPushDevice = require('./modules/production/RegisterPushDevice');
const getDeviceSettings = require('./modules/production/GetDeviceSettings');
const getNewsFeed = require('./modules/production/GetNewsFeed');
const slackListener = require('./modules/production/SlackListener');
const gameTrigger = require('./modules/production/GamesTrigger');
const recentFeed = require('./modules/production/RecentFeed');
const cheers = require('./modules/production/Cheers');
const view = require('./modules/production/View');

// MODULES STAGING
const updateNotificationPreferenceStaging = require('./modules/staging/UpdateNotificationPreference');
const registerPushDeviceStaging = require('./modules/staging/RegisterPushDevice');
const getDeviceSettingsStaging = require('./modules/staging/GetDeviceSettings');
const getNewsFeedStaging = require('./modules/staging/GetNewsFeed');
const slackListenerStaging = require('./modules/staging/SlackListener');
const gameTriggerStaging = require('./modules/staging/GamesTrigger');
const recentFeedStaging = require('./modules/staging/RecentFeed');
const cheersStaging = require('./modules/staging/Cheers');
const viewStaging = require('./modules/staging/View');

// MODULES DEV
const updateNotificationPreferenceDev = require('./modules/development/UpdateNotificationPreference');
const registerPushDeviceDev = require('./modules/development/RegisterPushDevice');
const getDeviceSettingsDev = require('./modules/development/GetDeviceSettings');
const getNewsFeedDev = require('./modules/development/GetNewsFeed');
const slackListenerDev = require('./modules/development/SlackListener');
const gameTriggerDev = require('./modules/development/GamesTrigger');
const recentFeedDev = require('./modules/development/RecentFeed');
const cheersDev = require('./modules/development/Cheers');
const viewDev = require('./modules/development/View');

const config =	process.env.PWD === '/user_code' ? functions.config() : localConfig();

// PRODUCTION FUNCTIONS
exports.cheers = functions.https.onRequest((req, res) => cheers(req, res, config));
exports.view = functions.https.onRequest((req, res) => view(req, res, config));
exports.getNewsFeed = functions.https.onRequest((req, res) => getNewsFeed(req, res, config));
exports.slackListener = functions.https.onRequest((req, res) => slackListener(req, res, config));
exports.recentFeed = functions.https.onRequest((req, res) => recentFeed(req, res, config));
exports.registerPushDevice = functions.https.onRequest((req, res) => registerPushDevice(req, res, config));
exports.getDeviceSettings = functions.https.onRequest((req, res) => getDeviceSettings(req, res, config));
exports.updateNotificationPreference = functions.https.onRequest((req, res) => updateNotificationPreference(req, res, config));
exports.gamesOnWrite = functions.database
  .ref('/Games')
  .onWrite((req, res) => gameTrigger(req, res, config));

// STAGING FUNCTIONS
exports.viewStaging = functions.https.onRequest((req, res) => viewStaging(req, res, config));
exports.getNewsFeedStaging = functions.https.onRequest((req, res) => getNewsFeedStaging(req, res, config));
exports.cheersStaging = functions.https.onRequest((req, res) => cheersStaging(req, res, config));
exports.slackListenerStaging = functions.https.onRequest((req, res) => slackListenerStaging(req, res, config));
exports.recentFeedStaging = functions.https.onRequest((req, res) => recentFeedStaging(req, res, config));
exports.registerPushDeviceStaging = functions.https.onRequest((req, res) => registerPushDeviceStaging(req, res, config));
exports.getDeviceSettingsStaging = functions.https.onRequest((req, res) => getDeviceSettingsStaging(req, res, config));
exports.updateNotificationPreferenceStaging = functions.https.onRequest((req, res) => updateNotificationPreferenceStaging(req, res, config));
exports.gameTriggerStaging = functions.database
	  .instance('mississauga-dolphins-staging')
	  .ref('/Games')
	  .onWrite((req, res) => gameTriggerStaging(req, res, config));

// DEV FUNCTIONS
exports.viewDev = functions.https.onRequest((req, res) => viewDev(req, res, config));
exports.getNewsFeedDev = functions.https.onRequest((req, res) => getNewsFeedDev(req, res, config));
exports.cheersDev = functions.https.onRequest((req, res) => cheersDev(req, res, config));
exports.slackListenerDev = functions.https.onRequest((req, res) => slackListenerDev(req, res, config));
exports.recentFeedDev = functions.https.onRequest((req, res) => recentFeedDev(req, res, config));
exports.registerPushDeviceDev = functions.https.onRequest((req, res) => registerPushDeviceDev(req, res, config));
exports.getDeviceSettingsDev = functions.https.onRequest((req, res) => getDeviceSettingsDev(req, res, config));
exports.updateNotificationPreferenceDev = functions.https.onRequest((req, res) => updateNotificationPreferenceDev(req, res, config));
exports.gamesOnWriteDev = functions.database
  .instance('mississauga-dolphins-dev')
  .ref('/Games')
  .onWrite((req, res) => gameTriggerDev(req, res, config));
