import { DataSource } from 'typeorm';
import { Menu } from './menus/entities/menu.entity';

export const AppDataSource = new DataSource({
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'menu_tree',
  entities: [Menu],
  synchronize: false, // penting: jangan true untuk production
});
