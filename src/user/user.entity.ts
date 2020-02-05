import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, getRepository, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import Profile from "src/profile/profile.entity";
import Entry from "src/entry/entry.entity";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        select: false,
        nullable: false
    })
    password: string;

    @Column({
        default: "bcrypt",
        select: false,
    })
    hashType: string;

    @OneToOne(_type => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(_type => Entry, entry => entry.user)
    entries: Entry[];

    entryCounts: {
        playlist: number;
        finished: number;
        completed: number;
        dropped: number;
        onhold: number;
    };

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async validatePassword(password: string) {
        const user = await getRepository(User)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.id = :id", { id: this.id })
            .getOne();

        const result = await bcrypt.compare(password, user.password);
        return result;
    }
}
