import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './users.dto';
import { UpdateUserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    await this.validate(userDTO);

    const user = await this.usersRepository.save({
      name: userDTO.name,
      password: await this.hashPassword(userDTO.password),
      document: userDTO.document,
      email: userDTO.email,
      telephone: userDTO.telephone,
    });

    delete user.password;

    return user;
  }

  async findAll(page: number, size: number): Promise<[User[], number]> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .orderBy('id')
      .limit(size)
      .offset(size * (page - 1))
      .getManyAndCount();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async remove(id: string) {
    const result = await this.usersRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  async update(id: string, userDTO: UpdateUserDTO): Promise<User> {
    await this.validate(userDTO, id);

    const user = {
      name: userDTO.name,
      document: userDTO.document,
      email: userDTO.email,
      telephone: userDTO.telephone,
    };

    const result = await this.usersRepository.update({ id }, user);

    if (!result.affected) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return await this.usersRepository.findOneBy({ id });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async validate(userDTO: CreateUserDTO | UpdateUserDTO, id?: string) {
    let query = this.usersRepository.createQueryBuilder('user').where(
      new Brackets((qb) => {
        return qb
          .where('user.document = :document', { document: userDTO.document })
          .orWhere('user.email = :email', { email: userDTO.email })
          .orWhere('user.telephone = :telephone', { telephone: userDTO.telephone });
      }),
    );

    if (id) {
      query = query.andWhere('user.id != :id', { id });
    }

    const exist = await query.getExists();

    if (exist) {
      throw new HttpException(`Cannot ${id ? 'update' : 'create'} user!`, HttpStatus.CONFLICT);
    }
  }
}
