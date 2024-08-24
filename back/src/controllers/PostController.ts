import { Request, Response } from 'express';
import { Post } from '../entities/Post';

export class PostController {

  // Criar um novo post
  public async createPost(req: Request, res: Response): Promise<Response> {
    const { title, content, userId } = req.body;
    const post = Post.create({ title, content, user: userId });
    await post.save();
    return res.status(201).json(post);
  }

  // Obter todos os posts
  public async getPosts(req: Request, res: Response): Promise<Response> {
    const posts = await Post.find({ relations: ['user'] });
    return res.status(200).json(posts);
  }

  // Obter um post pelo ID
  public async getPostById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id: parseInt(id, 10) }, relations: ['user'] });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json(post);
  }

  // Atualizar um post
  public async updatePost(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id: parseInt(id, 10) } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    Post.merge(post, req.body);
    await post.save();
    return res.status(200).json(post);
  }

  // Deletar um post
  public async deletePost(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id: parseInt(id, 10) } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.remove();
    return res.status(204).send();
  }
}