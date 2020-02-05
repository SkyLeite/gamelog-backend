import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    displayName: string;

    @Column()
    age: number;

    @Column()
    location: string;

    @Column()
    avatar: string;

    @Column("text")
    about: string;

}
