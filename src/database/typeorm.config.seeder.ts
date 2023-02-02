import { DataSource } from 'typeorm';
import { typeormConfig } from './typeorm.config';

export default new DataSource({
  ...typeormConfig,
  migrations: [__dirname + '/seeder/**/*{.ts,.js}'],
  migrationsTableName: 'seeder',
});
