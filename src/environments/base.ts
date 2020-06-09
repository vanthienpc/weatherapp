export default function baseEnv(baseApi: string) {
  return {
    api: {
      weather: `${baseApi}/weather`,
      forecast: `${baseApi}/forecast`,
    },
    isProduction: true,
    isDevelopment: false,
    isTesting: false,
  };
}

export type Environment = ReturnType<typeof baseEnv>;
