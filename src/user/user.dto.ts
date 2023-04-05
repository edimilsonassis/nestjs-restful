import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class DtoUserAddress {
  @Length(3, 100)
  @IsNotEmpty({ message: 'Rua is required!' })
  readonly rua: string;

  @Length(1, 100)
  @IsNotEmpty({ message: 'Numero required!' })
  readonly numero: string;
}

export class DtoUser {
  readonly id: number;

  @IsEmail({}, { message: 'Insert a valid e-mail' })
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly avatar: string;

  @IsNotEmpty({ message: 'First Name is required!' })
  @Length(3, 100)
  readonly first_name: string;

  @IsNotEmpty({ message: 'Last Name required!' })
  @Length(3, 100)
  readonly last_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DtoUserAddress)
  readonly address: DtoUserAddress[];
}
