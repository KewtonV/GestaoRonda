import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import uploadConfig from '@config/upload';

@Entity('tb_ClosedCompetenciesHistory')
export default class ClosedCompetenciesHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  environmentId: number;

  @Column('int')
  ocorrenciaId: number;

  @Column()
  observacao: string;

  @Column()
  image: string;

  @Expose({ name: 'imageUrl' })
  getImageUrl(): string {
    if (!this.image) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL}/files/${this.image}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucketProcedures}.s3.amazonaws.com/${this.image}`;
      default:
        return null;
    }
  }

  @Column('datetime2')
  createdAt: Date;

  @Column('datetime2')
  updatedAt: Date;
}
