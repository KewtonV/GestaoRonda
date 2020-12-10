import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_Employees')
export default class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registration: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  occupation: string;

  @Column()
  centroCusto: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
