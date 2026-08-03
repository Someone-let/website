import * as z from "zod";

export const postAddSchema = z.object({
    title: z.string().min(6, "Title must be at least 6 characters long"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters long"),
    image: z.string().url("Image must be a valid URL").optional(),
});

// Backward compatible alias while existing imports are updated.
export const registerSchema = postAddSchema;
