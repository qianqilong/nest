import { developmentConfig } from './config/development.config';
import { productionConfig } from './config/production.config';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../.env') });
console.log(process.env.NODE_ENV);
export const Configser = {
  provide: 'Configser',
  useValue:
    process.env.NODE_ENV === 'development'
      ? developmentConfig
      : productionConfig,
};
