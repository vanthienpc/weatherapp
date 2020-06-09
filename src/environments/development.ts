import environment, { Environment } from './base';

const baseApi = `https://${process.env.REACT_APP_API_HOST}`;
const env = environment(baseApi);

const developmentEnv: Environment = {
  ...env,
  api: { ...env.api },
  isProduction: false,
  isDevelopment: true,
};

export default developmentEnv;
