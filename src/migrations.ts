import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


export = [
  new DataSource({
    type: 'postgres',
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    logging: true,
    synchronize: false,
    entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
    migrations: [ __dirname + '/migrations/*{.ts,.js}' ],
    namingStrategy: new SnakeNamingStrategy(),
    migrationsRun: false
  })
];
