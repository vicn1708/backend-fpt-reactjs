import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albumRepository } from 'src/models/entities/album.entity';
import { imageRepository } from 'src/models/entities/image.entity';

@Injectable()
export class AlbumService {
  async create(createAlbumDto: CreateAlbumDto) {
    return await albumRepository.create(createAlbumDto);
  }

  async findAllAlbumByUserId(userId: string) {
    const result = await albumRepository
      .find({ field: 'userId', value: userId })
      .execute();

    if (Array.isArray(result)) {
      return result;
    } else {
      return [result];
    }
  }

  async findOne(id: string) {
    return await albumRepository.findById(id).execute();
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await albumRepository.updateById(id, updateAlbumDto);
  }

  async remove(id: string) {
    const getAllImageByAlbumId = await imageRepository
      .find({ field: 'albumId', value: id })
      .execute();

    if (Array.isArray(getAllImageByAlbumId)) {
      getAllImageByAlbumId.map(async (img: any) => {
        await imageRepository.deleteById(img.id);
      });
    } else {
      await imageRepository.deleteById(getAllImageByAlbumId.id);
    }

    return await albumRepository.deleteById(id);
  }
}
