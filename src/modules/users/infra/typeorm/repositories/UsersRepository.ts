import { getRepository, Repository, getConnection } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRespository from '@modules/users/repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import Company from '@modules/companies/infra/typeorm/entities/Company';

export default class UsersRepository implements IUsersRespository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findByCompany(id: number): Promise<Company | undefined> {
    const company = await getRepository(Company).findOne(id);
    return company;
  }

  public async create({
    nome,
    email,
    password,
    ativo,
    dataNascimento,
    cpf,
    telefone,
    coordenador,
    tipo,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      nome,
      email: email.toLowerCase(),
      password,
      ativo,
      dataNascimento,
      cpf,
      telefone,
      coordenador,
      tipo,
    });

    const employee = await getConnection().query(
      `SELECT * FROM tb_Employees WHERE cpf = '${cpf}'`,
    );

    const company = await getConnection().query(`
      SELECT * FROM tb_Companies WHERE centroCusto = '${employee[0].centroCusto}'
    `);

    user.companyId = company[0].id;

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
