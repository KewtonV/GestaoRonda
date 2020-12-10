import Company from '@modules/companies/infra/typeorm/entities/Company';
import User from '@modules/users/infra/typeorm/entities/User';

export interface RequestAuthenticateService {
  email: string;
  password: string;
}

export interface ResponserAuthenticateService {
  user: User;
  company: Company;
  token: string;
}
