import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEstabelecimentoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsString()
    @IsNotEmpty()
    valor_da_locacao: string;

    @IsString()
    @IsNotEmpty()
    endereco: string;

    @IsString()
    @IsNotEmpty()
    cidade: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsString()
    @IsOptional()
    link_maps: string;

    @IsOptional()
    imagem_perfil: Buffer;

    @IsOptional()
    imagens_estabelecimento: Buffer[];

    @IsArray()
    @IsString()
    dias_funcionamento: string[];

    @IsArray()
    @IsString()
    horas_funcionamento: string[];

    @IsArray()
    @IsString()
    horarios_disponiveis: string[];

    @IsArray()
    @IsString()
    tipo_estabelecimento: string[];

    @IsArray()
    @IsString()
    atividades_oferecidas: string[];
}
