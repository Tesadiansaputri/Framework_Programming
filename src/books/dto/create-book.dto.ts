import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({ message: 'Title harus diisi' })
    readonly title: string;

    @IsNotEmpty({ message: 'Author harus diisi' })
    readonly author: string;

    @IsNotEmpty({ message: 'ISBN harus diisi' })
    readonly isbn: string;

    @IsNotEmpty({ message: 'Published year harus diisi' })
    @IsInt({ message: 'Published year must be an integer' })
    readonly publishedYear: number;
}