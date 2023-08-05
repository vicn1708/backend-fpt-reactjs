import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get(':userId')
  findAllAlbumByUserId(@Param('userId') userId: string) {
    return this.albumService.findAllAlbumByUserId(userId);
  }

  @Get(':albumId')
  findOne(@Param('albumId') albumId: string) {
    return this.albumService.findOne(albumId);
  }

  @Patch(':albumId')
  update(
    @Param('albumId') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(albumId, updateAlbumDto);
  }

  @Delete(':albumId')
  remove(@Param('albumId') albumId: string) {
    return this.albumService.remove(albumId);
  }
}
