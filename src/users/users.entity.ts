import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 14 })
  document: string;

  @Column()
  email: string;

  @Column({ length: 15 })
  telephone: string;
}
