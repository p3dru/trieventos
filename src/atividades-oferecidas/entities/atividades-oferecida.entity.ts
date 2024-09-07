import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AtividadeOferecida {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    atividade: string;
}
