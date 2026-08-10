import * as z from "zod";

export const commentSchema = z.object({
  postId: z.string().min(1),
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment is too long"),
});

export type CommentInput = z.infer<typeof commentSchema>;
