import z from "zod";

export const getProfileSchema = z.string().uuid();
