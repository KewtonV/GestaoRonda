export default interface RequestUpdateUserService {
  userId: string;
  nome?: string;
  telefone?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  passwordConfirmation?: string;
}
