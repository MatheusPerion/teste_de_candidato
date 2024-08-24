import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './Users';

@Entity({ name: 'user_logins' })
export class UserLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginDate: Date;

  @Column()
  ipAddress: string;

  @ManyToOne(() => User, user => user.logins)
  user: User;
}