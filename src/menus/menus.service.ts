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
      // Sekarang, kita hanya perlu relasi 'children' karena parentId sudah ada sebagai kolom
      relations: ['children'],
      order: { orderNo: 'ASC' },
    });

    const map = new Map<number, any>();
    const roots: any[] = [];

    // Langkah 1: Inisialisasi map dengan semua menu dan tambahkan parentId
    menus.forEach((menu) => {
      map.set(menu.id, {
        ...menu,
        parentId: menu.parentId, // 👈 Ambil langsung dari kolom baru
        children: [],
      });
    });

    // Langkah 2: Bangun tree menggunakan parentId
    menus.forEach((menu) => {
      // Gunakan kolom parentId, bukan lagi objek parent
      if (menu.parentId !== null) {
        const parentNode = map.get(menu.parentId);
        if (parentNode) {
          parentNode.children.push(map.get(menu.id));
        }
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
