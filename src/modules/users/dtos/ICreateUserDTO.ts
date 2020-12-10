export default interface ICreateUserDTO {
  nome: string;
  email: string;
  password: string;
  ativo: number;
  dataNascimento: string;
  cpf: string;
  telefone: string;
  coordenador: number;
  tipo: string;
}
