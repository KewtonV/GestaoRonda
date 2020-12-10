import Company from '@modules/companies/infra/typeorm/entities/Company';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCompany(id: number): Promise<Company | undefined>;
  create(userData: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
