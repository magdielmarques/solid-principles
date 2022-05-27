import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUseCase {
  // private usersRepository: IUsersRepository;

  constructor(
    private usersRepository: IUsersRepository
    // usersRepository: IUsersRepository
  ) {
    // this.usersRepository = usersRepository;
  } 

  async execute (data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) throw new Error('User already exists.')

    const user = new User(data);

    await this.usersRepository.save(user);

  }
}
// Single responsability principle: a classe se responsabiliza em apenas validar se usuario existe e criar
// Nao tem resabilidade de saber como esse usuario sera salvo, etc.