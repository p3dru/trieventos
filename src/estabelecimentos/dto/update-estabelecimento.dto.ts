import { PartialType } from '@nestjs/mapped-types';
import { CreateEstabelecimentoDto } from './create-estabelecimento.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateEstabelecimentoDto extends PartialType(CreateEstabelecimentoDto) {
    @IsString()
    @IsOptional()
    nome: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    senha: string;

    @IsString()
    @IsOptional()
    descricao: string;

    @IsString()
    @IsOptional()
    valor_da_locacao: string;

    @IsString()
    @IsOptional()
    endereco: string;

    @IsString()
    @IsOptional()
    cidade: string;

    @IsString()
    @IsOptional()
    estado: string;

    @IsString()
    @IsOptional()
    link_maps: string;

    @IsOptional()
    imagem_perfil: Buffer;

    @IsOptional()
    imagens_estabelecimento: Buffer[];

    @IsOptional()
    @IsArray()
    @IsString()
    dias_funcionamento: string[];

    @IsOptional()
    @IsArray()
    @IsString()
    horas_funcionamento: string[];

    @IsOptional()
    @IsArray()
    @IsString()
    horarios_disponiveis: string[];

    @IsOptional()
    @IsArray()
    @IsString()
    tipo_estabelecimento: string[];

    @IsOptional()
    @IsArray()
    @IsString()
    atividades_oferecidas: string[];
}
