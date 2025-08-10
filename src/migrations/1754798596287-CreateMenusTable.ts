/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMenusTable1723280234567 implements MigrationInterface {
    name = 'CreateMenusTable1723280234567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`menus\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`url\` varchar(255) NULL,
                \`parent_id\` INT NULL,
                \`order_no\` int NOT NULL DEFAULT '0',
                \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`FK_parent_menu\` FOREIGN KEY (\`parent_id\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`menus\``);
    }
}
