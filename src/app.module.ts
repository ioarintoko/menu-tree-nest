import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusModule } from './menus/menus.module';
import { Menu } from './menus/entities/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'menu_tree',
      entities: [Menu],
      synchronize: false,
    }),
    MenusModule,
  ],
})
export class AppModule {}
