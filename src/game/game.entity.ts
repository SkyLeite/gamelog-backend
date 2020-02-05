import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import Platform from "src/platform/platform.entity";
import Entry from "src/entry/entry.entity";

@Entity()
export default class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    art: string;
    
    @Column("text")
    description: string;

    @ManyToMany(_type => Platform, platform => platform.games)
    platforms: Platform[];

    @OneToMany(_type => Entry, entry => entry.game)
    entries: Entry[];

}
