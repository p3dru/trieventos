import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Administrador {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column("text")
    senha: string;

    @Column("bytea")
    imagem_perfil: Buffer;
}
