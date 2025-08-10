/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = this.menuRepository.create(createMenuDto);

    if (createMenuDto.parentId) {
      const parent = await this.menuRepository.findOne({
        where: { id: createMenuDto.parentId },
      });
      if (!parent) throw new NotFoundException('Parent menu not found');
      menu.parent = parent;
    }
    return this.menuRepository.save(menu);
  }

  findAll() {
    return this.menuRepository.find({
      relations: ['parent', 'children'],
      order: { orderNo: 'ASC' },
    });
  }

  async findAllAsTree() {
    const menus = await this.menuRepository.find({
      relations: ['parent', 'children'],
      order: { orderNo: 'ASC' },
    });

    // Ubah jadi tree
    const map = new Map<number, any>();
    const roots: any[] = [];

    menus.forEach((menu) => {
      map.set(menu.id, { ...menu, children: [] });
    });

    menus.forEach((menu) => {
      if (menu.parent) {
        map.get(menu.parent.id).children.push(map.get(menu.id));
      } else {
        roots.push(map.get(menu.id));
      }
    });

    return roots;
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
    if (!menu) throw new NotFoundException(`Menu #${id} not found`);
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id);

    if (updateMenuDto.parentId) {
      const parent = await this.menuRepository.findOne({
        where: { id: updateMenuDto.parentId },
      });
      if (!parent) throw new NotFoundException('Parent menu not found');
      menu.parent = parent;
    }
    Object.assign(menu, updateMenuDto);
    return this.menuRepository.save(menu);
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
    return this.menuRepository.remove(menu);
  }
}
