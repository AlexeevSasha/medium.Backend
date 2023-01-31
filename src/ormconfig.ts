import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'medium',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export default config;
