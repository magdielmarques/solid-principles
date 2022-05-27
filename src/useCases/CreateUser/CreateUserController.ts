import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(
    private createUsersUseCase: CreateUserUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      await this.createUsersUseCase.execute({
        name, 
        email, 
        password
      })

      return res.status(201).send()
    } catch (err) {
      return res.status(400).json({ 
        message: err.message || 'Unexpected error.'
      })
    }
  }
}