import { IsString, Length } from 'class-validator';
import DOMPurify from 'dompurify';
import { Transform } from 'class-transformer';

export class CreateSloganDto {
  @IsString()
  @Length(1, 300)
  @Transform(({ value }) => DOMPurify.sanitize(value))
  slogan: string;
}
