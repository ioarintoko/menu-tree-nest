/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedMenus1733900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO menus (name, url, parent_id, order_no, created_at, updated_at) VALUES
      ('Dashboard', '/dashboard', NULL, 1, NOW(), NOW()),
      ('User Management', '/users', NULL, 2, NOW(), NOW()),
      ('Menu Management', '/menus', NULL, 3, NOW(), NOW()),
      ('Settings', '/settings', NULL, 4, NOW(), NOW()),
      ('Roles', '/users/roles', 2, 1, NOW(), NOW()),
      ('Permissions', '/users/permissions', 2, 2, NOW(), NOW()),
      ('Menu Tree', '/menus/tree', 3, 1, NOW(), NOW());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM menus
      WHERE name IN (
        'Dashboard', 'User Management', 'Menu Management', 'Settings',
        'Roles', 'Permissions', 'Menu Tree'
      );
    `);
  }
}
