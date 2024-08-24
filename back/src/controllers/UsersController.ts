import { Request, Response } from 'express';
import { User } from '../entities/Users';

export class UserController {

  // Criar um novo usuário
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, email, password } = req.body;
    const user = User.create({ firstName, lastName, email, password });
    await user.save();
    return res.status(201).json(user);
  }

  // Obter todos os usuários
  public async getUsers(req: Request, res: Response): Promise<Response> {
    const users = await User.find();
    return res.status(200).json(users);
  }

  // Obter um usuário pelo ID
  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: parseInt(id, 10) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  }

  // Atualizar um usuário
  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: parseInt(id, 10) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    User.merge(user, req.body);
    await user.save();
    return res.status(200).json(user);
  }

  // Deletar um usuário
  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: parseInt(id, 10) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    return res.status(204).send();
  }
}