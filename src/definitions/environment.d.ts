declare module 'environment' {
  import baseEnv from 'environment/base';
  const value: ReturnType<typeof baseEnv>;

  export default value;
}
