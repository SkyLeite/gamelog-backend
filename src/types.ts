import User from "./user/user.entity";

export type AppRequest = Request & { user: User };
