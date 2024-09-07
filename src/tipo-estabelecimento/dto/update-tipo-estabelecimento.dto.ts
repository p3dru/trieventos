import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEstabelecimentoDto } from './create-tipo-estabelecimento.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTipoEstabelecimentoDto extends PartialType(CreateTipoEstabelecimentoDto) {
    @IsOptional()
    @IsString()
    tipo: string;
}
