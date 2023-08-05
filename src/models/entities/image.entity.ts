import { RootEntity } from '../root-entity';
import db from 'src/configs/firebase.config';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { ImageRepository } from 'src/repositories/image.repository';

export class Images extends RootEntity {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  albumId: string;

  @ApiProperty()
  src: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  desc: string;
}

const imageCollection = _.camelCase(Images.name);

export const imageRepository = new ImageRepository(imageCollection, db);
