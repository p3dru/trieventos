import { PartialType } from '@nestjs/mapped-types';
import { CreateDiasFuncionamentoDto } from './create-dias-funcionamento.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDiasFuncionamentoDto extends PartialType(CreateDiasFuncionamentoDto) {
    @IsOptional()
    @IsString()
    dia: string;
}
