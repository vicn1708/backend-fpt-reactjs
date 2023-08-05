import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateImageDto } from './dtos/create-image.dto';
import { UpdateImageDto } from './dtos/update-image.dto';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  createImage(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Patch(':imageId')
  updateImage(
    @Param('imageId') imageId: string,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.updateImage(imageId, updateImageDto);
  }

  @Get()
  getAllImage() {
    return this.imageService.getAllImage();
  }

  @Get('byAlbum/:albumId')
  getAllImageByAlbumId(@Param('albumId') albumId: string) {
    return this.imageService.getAllImageByAlbumId(albumId);
  }

  @Get(':imageId')
  getOneImage(@Param('userId') userId: string) {
    return this.imageService.getOneImage(userId);
  }

  @Delete(':imageId')
  removeImage(@Param('imageId') imageId: string) {
    return this.imageService.remove(imageId);
  }
}
