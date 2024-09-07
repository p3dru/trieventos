import { IsNotEmpty, IsString } from "class-validator";

export class CreateHorariosDeFuncionamentoDto {
    @IsString()
    @IsNotEmpty()
    horario: string;
}
