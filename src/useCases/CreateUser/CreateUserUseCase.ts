import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUseCase {
  // private usersRepository: IUsersRepository;

  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider, 
    // usersRepository: IUsersRepository
  ) {
    // this.usersRepository = usersRepository;
  } 

  async execute (data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) throw new Error('User already exists.')

    const user = new User(data);

    await this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe da empresa de Magdiel',
        email: 'contato.magdiel@gmail.com',
      },
      subject: 'Seja bem-vindo!',
      body: '<h1>Voce ja pode fazer login em nossa plataforma.</h1>'
    })
  }
}
/* 
1 - Single responsability principle: a classe se responsabiliza em apenas validar se usuario existe e 
    criar. Nao tem resabilidade de saber como esse usuario sera salvo no banco, etc.

3 - Liskov substitution principle - a partir do momento que essa classe recebe o repositorio 
    (que sao classes especificas para fazer comunicacao entre na camada externa da aplicacao) 
    falando que o tipo dele e uma interface que define metodos que vao existir no repositorio,
    eu estou defendendo esse principio. NAO IMPORTA SE HOUVER TROCA NA CAMADA EXTERNA, TIPO DE 
    BANCO, POR EXEMPLO, AINDA ASSIM TUDO IRA FUNCIONAR.

5 - Dependency inversion principle: Essa classe e uma abstracao da real implementacao, em outras palavras, 
    ela nao depende de metodos internos para que ela funcione. Ela vai depender de uma outra classe que
    faz a implementacao.
*/