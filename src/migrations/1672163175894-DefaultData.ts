import { MigrationInterface, QueryRunner } from "typeorm"

export class DefaultData1672163175894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Default User (admin@yourday.me | admin)
        await queryRunner.query(`INSERT INTO users (email, username, password, activated) values ('admin@yourday.me', 'admin', '$2b$10$p9ECcIpNRM5Hh8sJUhmQCOONhbPhJ.zcohHKY7/igw7o0UIrb.tMi', true)`);

        // Default Roles
        await queryRunner.query(`INSERT INTO roles (title) values ('admin')`);
        await queryRunner.query(`INSERT INTO roles (title) values ('user')`);

        // Default Constraints
        await queryRunner.query(`INSERT INTO users_roles (users_id, roles_id) values (1, 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users_roles WHERE users_id = 1`);

        await queryRunner.query(`DELETE FROM users WHERE username = 'admin'`);

        await queryRunner.query(`DELETE FROM roles WHERE title = 'admin'`);
        await queryRunner.query(`DELETE FROM roles WHERE title = 'user'`);
    }

}
