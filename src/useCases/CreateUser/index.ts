import { CreateUserUseCase} from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { MailtrapIMailProvider } from "../../providers/implementations/MailtrapMailProvider";

const postgresUsersRepository = new PostgresUsersRepository()
const mailtrapMailProvider = new MailtrapIMailProvider()

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider,
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export {  createUserUseCase, createUserController }