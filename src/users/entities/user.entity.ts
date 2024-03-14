import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { Role } from './role.entity';
import { UserRole } from './UserRole';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role: UserRole;

  // @ManyToOne(() => Role)
  // role: Role;
}
