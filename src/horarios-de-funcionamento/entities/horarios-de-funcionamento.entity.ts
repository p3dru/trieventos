import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HorariosDeFuncionamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    horario: string;
}
