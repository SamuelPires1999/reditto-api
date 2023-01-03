import { Session } from "express-session";
type SessionWithUserId = {
    userId: string | undefined;
};

declare module "express-session" {
    interface Session extends SessionWithUserId {}
}
