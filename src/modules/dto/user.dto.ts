import { Expose } from 'class-transformer';
import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {

    @Expose()
    @IsString()
    @IsNotEmpty()
    readonly fullName: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @Expose()
    @IsISO8601()
    @IsNotEmpty()
    readonly birthDate: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

}

export class UserUpdateDto {

    @Expose()
    @IsString()
    @IsNotEmpty()
    readonly fullName: string;

    @Expose()
    @IsISO8601()
    @IsNotEmpty()
    readonly birthDate: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

}