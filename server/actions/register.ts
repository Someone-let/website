"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "..";
import { registerSchema } from "../../types/register-schema";
import { users } from "../schema";

type RegisterInput = unknown;

export async function registerUser(input: RegisterInput) {
	if (!db) {
		return { error: "Database is not configured" };
	}

	const parsed = registerSchema.safeParse(input);

	if (!parsed.success) {
		return {
			error: parsed.error.issues[0]?.message ?? "Invalid registration data",
		};
	}

	const { email, password, name } = parsed.data;

	const [existingUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, String(email)))
          .limit(1);

	if (existingUser) {
		return { error: "An account with this email already exists" };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.insert(users).values({
		name,
		email,
		password: hashedPassword,
		emailVerified: null,
	});

	return { success: "Account created successfully" };
}
