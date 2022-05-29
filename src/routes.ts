import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";

const router = Router();

router.post('/users', async (req, res) => {
  return createUserController.handle(req, res); 
});

router.get('/users', async (req, res) => {
  return res.status(200).json('Voce ainda nao pode fazer esta requisicao');
})

export { router }