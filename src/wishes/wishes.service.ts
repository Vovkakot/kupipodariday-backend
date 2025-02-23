import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { validate } from 'class-validator';
import { User } from '../users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createWishDto: CreateWishDto, userId: number) {
    const wish = await this.validate(createWishDto);
    const user = await this.userRepository.findOneBy({ id: userId });
    wish.owner = user;
    return this.wishRepository.save(createWishDto);
  }

  private async validate(createWishDto: CreateWishDto) {
    const wish = new Wish();
    for (const key in createWishDto) {
      wish[key] = createWishDto[key];
    }
    const errors = await validate(wish, { whitelist: true });
    if (errors.length > 0) {
      throw new BadRequestException('Данные не прошли валидацию');
    }
    return wish;
  }

  findById(id: number) {
    const wish = this.wishRepository.findOne({
      relations: {
        offers: {
          user: true,
        },
        owner: true,
      },
      where: { id },
    });
    if (!wish) {
      throw new BadRequestException('Подарок не найден');
    }
    return wish;
  }

  async delete(id: number, userId: number) {
    const wish = await this.wishRepository.findOne({
      relations: {
        owner: true,
      },
      where: {
        id,
        owner: {
          id: userId,
        },
      },
    });
    if (!wish) throw new BadRequestException('Подарок не найден');
    try {
      return await this.wishRepository.remove(wish);
    } catch (err) {
      throw new ConflictException(
        'Нельзя удалить подарок на который уже скинулись',
      );
    }
  }

  async update(id: number, updateWishDto: UpdateWishDto, userId: number) {
    const wish = await this.wishRepository.findOne({
      relations: {
        offers: true,
        owner: true,
      },
      where: {
        id,
        owner: {
          id: userId,
        },
      },
    });
    if (!wish) {
      throw new BadRequestException('Подарок не найден');
    }
    if (!wish.offers.length) {
      for (const key in updateWishDto) {
        wish[key] = updateWishDto[key];
      }
      return this.wishRepository.save(wish);
    }
    return wish;
  }

  getLastWishes() {
    return this.wishRepository.find({
      order: {
        createdAt: 'DESC',
      },
      skip: 0,
      take: 40,
    });
  }

  getTopWishes() {
    return this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      skip: 0,
      take: 20,
    });
  }

  async copy(id: number, userId: number) {
    const wish = await this.wishRepository.findOneBy({ id });
    if (!wish) throw new BadRequestException('Подарок не найден');
    const user = await this.userRepository.findOne({
      relations: {
        wishes: true,
      },
      where: {
        id: userId,
      },
    });
    const isWishHas = user.wishes.some((item) => item.id === wish.id);
    if (!isWishHas) {
      const newWish = this.wishRepository.create(wish);
      newWish.copied = 0;
      newWish.raised = 0;
      newWish.owner = user;
      wish.copied += 1;
      await this.wishRepository.save(wish);
      await this.wishRepository.insert(newWish);
    }
    return user;
  }
}
