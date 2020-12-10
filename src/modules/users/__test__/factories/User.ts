export const factoryUserCorrectValue = {
  nome: 'André Felipe',
  email: 'andre@gmail.com',
  emailConfirmation: 'andre@gmail.com',
  password: '123456',
  dataNascimento: '17/10/1997',
  cpf: '06837432362',
  telefone: '0000000000',
  companyId: 1,
  ativo: 1,
  coordenador: 0,
  tipo: 'Fixo',
};

export const factoryUserIncorrectValue = {
  nome: 'André Felipe',
  email: 'andre@gmail.com',
  emailConfirmation: 'andre1@gmail.com',
  password: '123456',
  dataNascimento: '1997-10-17',
  cpf: '99833902057',
  telefone: '8599238126515',
  empresaID: 1,
  ativo: 1,
  coordenador: 0,
  tipo: 'fixo',
};

export const factoryUserIncorrectCpf = {
  nome: 'André Felipe',
  email: 'andre@gmail.com',
  emailConfirmation: 'andre@gmail.com',
  password: '123456',
  dataNascimento: '17/10/1997',
  cpf: '00000000000',
  telefone: '0000000000',
  companyId: 1,
  ativo: 1,
  coordenador: 0,
  tipo: 'Fixo',
};
