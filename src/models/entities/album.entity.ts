import { RootEntity } from '../root-entity';
import db from 'src/configs/firebase.config';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { AlbumRepository } from 'src/repositories/album.repository';

export class Albums extends RootEntity {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;
}

const albumCollection = _.camelCase(Albums.name);

export const albumRepository = new AlbumRepository(albumCollection, db);
