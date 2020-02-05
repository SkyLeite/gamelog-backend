import { EntityRepository, Repository, getRepository, ObjectLiteral, FindConditions } from "typeorm";
import User from "./user.entity";
import Entry from "src/entry/entry.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    private getEntryCounts(id: number): Promise<{ status: string, count: string }[]> {
        return getRepository(Entry)
            .createQueryBuilder("entry")
            .select(["status", "COUNT(status) as count"])
            .where("userId = :id", { id })
            .groupBy("status")
            .getRawMany() as unknown as Promise<{ status: string, count: string }[]>;
    }

    private async buildEntryCounts(id: number): Promise<any> {
        return (await this.getEntryCounts(id)).reduce<{ [_: string]: number }>((acc, cur) => {
            acc[cur.status] = parseInt(cur.count, 10);
            acc.total = acc.total + parseInt(cur.count);
            return acc;
        }, {
            total: 0,
        });
    }

    public async findWithEntryCount(query: FindConditions<User>): Promise<User> {
        const user = await this.findOne(query, {
            relations: ["profile"],
        });

        user.entryCounts = await this.buildEntryCounts(user.id);
        return user;
    }
    
}
