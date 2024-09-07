import { PartialType } from '@nestjs/mapped-types';
import { CreateHorariosDeFuncionamentoDto } from './create-horarios-de-funcionamento.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateHorariosDeFuncionamentoDto extends PartialType(CreateHorariosDeFuncionamentoDto) {
    @IsOptional()
    @IsString()
    horario: string;
}
