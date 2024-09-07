import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string

    @Column("text")
    senha: string;

    @Column("bytea")
    imagem_perfil: Buffer;

    @Column({default: true})
    ativo: boolean;
}

