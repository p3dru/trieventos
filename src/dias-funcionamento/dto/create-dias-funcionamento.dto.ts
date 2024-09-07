import { IsNotEmpty, IsString } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateDiasFuncionamentoDto {
    @IsString()
    @IsNotEmpty()
    dia: string;
}
