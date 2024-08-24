import { Request, Response } from 'express';
import { UserLogin } from '../entities/UserLogin';

export class UserLoginController {

  // Criar um novo registro de login
  public async createUserLogin(req: Request, res: Response): Promise<Response> {
    const { loginDate, ipAddress, userId } = req.body;
    const userLogin = UserLogin.create({ loginDate, ipAddress, user: userId });
    await userLogin.save();
    return res.status(201).json(userLogin);
  }

  // Obter todos os registros de login
  public async getUserLogins(req: Request, res: Response): Promise<Response> {
    const logins = await UserLogin.find({ relations: ['user'] });
    return res.status(200).json(logins);
  }

  // Obter um registro de login pelo ID
  public async getUserLoginById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userLogin = await UserLogin.findOne({ where: { id: parseInt(id, 10) }, relations: ['user'] });
    if (!userLogin) {
      return res.status(404).json({ message: 'Login record not found' });
    }
    return res.status(200).json(userLogin);
  }

  // Deletar um registro de login
  public async deleteUserLogin(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userLogin = await UserLogin.findOne({ where: { id: parseInt(id, 10) } });
    if (!userLogin) {
      return res.status(404).json({ message: 'Login record not found' });
    }

    await userLogin.remove();
    return res.status(204).send();
  }
}