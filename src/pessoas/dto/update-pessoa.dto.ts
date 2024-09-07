import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    senha?: string;

    @IsOptional()
    imagem_perfil?: Buffer;
}
