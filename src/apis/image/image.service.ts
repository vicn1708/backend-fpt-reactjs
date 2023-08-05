import { Injectable } from '@nestjs/common';
import { imageRepository } from 'src/models/entities/image.entity';
import { CreateImageDto } from './dtos/create-image.dto';
import { UpdateImageDto } from './dtos/update-image.dto';
import { albumRepository } from 'src/models/entities/album.entity';

@Injectable()
export class ImageService {
  async create(createImageDto: CreateImageDto) {
    return await imageRepository.create(createImageDto);
  }

  async getAllImage() {
    const result = await imageRepository.findAll().execute();

    return result;
  }

  async getOneImage(imageId: string) {
    return await imageRepository.findById(imageId).execute();
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    return await imageRepository.updateById(id, updateImageDto);
  }

  async remove(id: string) {
    return await imageRepository.deleteById(id);
  }

  async getAllImageByAlbumId(albumId: string) {
    const album = await albumRepository
      .findById(albumId)
      .select('id name')
      .execute();

    const images = await imageRepository
      .find({ field: 'albumId', value: albumId })
      .execute();

    const result = {
      ...album,
      images: Array.isArray(images)
        ? images
        : images === undefined
        ? []
        : [images],
    };

    return result;
  }
}
