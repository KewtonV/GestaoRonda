import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

@Entity('tb_Users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  dataNascimento: string;

  @Column()
  cpf: string;

  @Column()
  telefone: string;

  @Column('int')
  companyId: number;

  @Column('int')
  ativo: number;

  @Column('int')
  coordenador: number;

  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucketAvatar}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }

  @Column()
  tipo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
