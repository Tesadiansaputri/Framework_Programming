import { IsEmail, IsNotEmpty, MaxLength, Min, MinLength } from "class-validator";

export class  LoginDto {
    @IsNotEmpty({ message: 'Email harus diisi' })
    @IsEmail({}, { message: 'Email tidak valid' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password harus diisi' })
    @MinLength(4, { message: 'Password minimal 4 karakter' })
    @MaxLength(20, { message: 'Password maksimal 20 karakter' })
    readonly password: string;
}