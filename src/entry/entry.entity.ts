import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import User from "src/user/user.entity";
import Game from "src/game/game.entity";
import { Min, Max } from "class-validator";

export enum EntryStatus {
    PLAYLIST = "playlist",
    PLAYING = "playing",
    FINISHED = "finished",
    COMPLETED = "completed",
    DROPPED = "dropped",
    ONHOLD = "on_hold",
}

@Entity()
export default class Entry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Min(0)
    @Max(10)
    rating: number;

    @Column({
        type: "text",
        nullable: true,
    })
    notes: string;

    @Column()
    minutesPlayed: number;

    @Column()
    endDate: Date;

    @Column({
        type: "enum",
        enum: EntryStatus,
        default: EntryStatus.PLAYLIST,
    })
    status: EntryStatus;

    @ManyToOne(_type => Game, game => game.entries)
    game: Game;

    @ManyToOne(_type => User, user => user.entries)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        nullable: true,
    })
    deletedAt: Date;

}
