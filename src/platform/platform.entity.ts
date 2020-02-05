import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import Game from "src/game/game.entity";

@Entity()
export default class Platform {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    art: string;

    @Column("text")
    description: string;

    @ManyToMany(_type => Game, game => game.platforms)
    games: Game[];

}
