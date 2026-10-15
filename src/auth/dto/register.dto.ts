import { IsEmail, IsNotEmpty, Max, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Username harus diisi' })
    @Max(20, { message: 'Username maksimal 20 karakter' })
    readonly username: string;

    @IsNotEmpty({ message: 'Email harus diisi' })
    @IsEmail({}, { message: 'Email tidak valid' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password harus diisi' })
    @MinLength(4, { message: 'Password minimal 4 karakter' })
    @MaxLength(20, { message: 'Password maksimal 20 karakter' })
    readonly password: string;

    @IsNotEmpty({ message: 'Confirm Password harus diisi' })
    @MinLength(4, { message: 'Confirm Password minimal 4 karakter' })
    @MaxLength(20, { message: 'Confirm Password maksimal 20 karakter' })
    readonly confirmPassword: string;
}
