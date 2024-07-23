// import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { EntityRepository, Repository } from 'typeorm';
// import { CreateUserDto } from './../user/dto/create-user.dto';
import { User } from 'src/models/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getAll(): Promise<User[]> {
    return this.find();
  }
  getOne(id: number): Promise<User> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
  createUser(user: any): Promise<User> {
    return this.save(user);
  }
  async edit(id: number, user: any): Promise<User> {
    await this.update(id, user);
    return this.getOne(id);
  }
  async deleteUser(id: number): Promise<string> {
    await this.delete(id);
    return 'ok';
  }
}
