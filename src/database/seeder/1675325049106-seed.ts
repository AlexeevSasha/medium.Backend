import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../user/user.entity';

export class seed1675325049106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UserEntity, [
      {
        email: 'test@mail.ru',
        password: '1234',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
