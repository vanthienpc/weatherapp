import environment, { Environment } from './base';

const baseApi = `https://${process.env.REACT_APP_API_HOST}`;
const env = environment(baseApi);

const testEnv: Environment = {
  ...env,
  isProduction: false,
  isDevelopment: true,
  isTesting: true,
};

export default testEnv;
