import environment, { Environment } from './base';

const baseApi = `https://${process.env.REACT_APP_API_HOST}`;
const env = environment(baseApi);

const productionEnv: Environment = {
  ...env,
};

export default productionEnv;
