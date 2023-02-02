import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';

export class seed1675325049106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UserEntity, [
      {
        email: 'test@mail.ru',
        password: await bcrypt.hash('1234', 10),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
