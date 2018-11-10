import develop from './env.develop';
import production from './env.production';
import staging from './env.staging';

const buildConfigs = { develop, staging, production };
let environment;

if (process.env.NODE_ENV === 'development') {
  environment = 'develop';
} else if (window.location.hostname.indexOf('staging') !== -1) {
  environment = 'staging';
} else {
  environment = 'production';
}
export default buildConfigs[environment];
