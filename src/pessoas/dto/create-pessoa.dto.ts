import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePessoaDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsOptional()
    imagem_perfil: Buffer;
}
