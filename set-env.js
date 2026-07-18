const fs = require('fs');

const envConfigFile = `export const environment = {
  production: true,
  API_KEY: '${process.env.OPENWEATHER_API_KEY}'
};`;

fs.writeFileSync('./src/environments/environment.prod.ts', envConfigFile);