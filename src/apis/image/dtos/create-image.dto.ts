import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsNotEmpty()
  albumId: string;

  @ApiProperty()
  @IsNotEmpty()
  src: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  desc: string;
}
