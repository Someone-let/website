"use client";

import { FormEvent, useState, useTransition } from "react";
import { ImagePlus, Send, Type, FileText } from "lucide-react";
import { createPost } from "@/server/actions/form-post";

import { Button } from "@/app/[locale]/components/ui/button";
import { Card } from "@/app/[locale]/components/ui/card";
import { Input } from "@/app/[locale]/components/ui/input";
import { Textarea } from "@/app/[locale]/components/ui/textarea";

type CreatePostFormProps = {
  onCancel?: () => void;
  onPostCreated?: () => void | Promise<void>;
};

export default function CreatePostForm({ onCancel, onPostCreated }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await createPost({
        title,
        description,
        image: image || undefined,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      setSuccess(result?.success ?? "Post published successfully");
      setTitle("");
      setDescription("");
      setImage("");
      await onPostCreated?.();
    });
  };

  return (
    <Card className="mx-auto max-h-[calc(100vh-2rem)] w-full overflow-y-auto rounded-3xl border-zinc-200 p-5 shadow-sm sm:max-h-[calc(100vh-3rem)] sm:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Create Post
        </h2>

        <p className="text-sm text-zinc-500">
          Share your question, idea, or discussion with the community.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {/* Title */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <Type size={16} />
            Title
          </label>

          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            minLength={6}
            placeholder="Enter an engaging title..."
            className="h-12 rounded-xl border-zinc-200"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <FileText size={16} />
            Description
          </label>

          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            minLength={10}
            placeholder="Tell everyone what your post is about..."
            className="min-h-[140px] resize-none rounded-xl border-zinc-200 sm:min-h-[180px]"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <ImagePlus size={16} />
            Image URL (Optional)
          </label>

          <Input
            value={image}
            onChange={(event) => setImage(event.target.value)}
            type="url"
            placeholder="https://example.com/your-image.jpg"
            className="h-12 rounded-xl border-zinc-200"
          />
        </div>

        {error ? (
          <p className="text-sm font-medium text-red-600">{error}</p>
        ) : null}

        {success ? (
          <p className="text-sm font-medium text-emerald-600">{success}</p>
        ) : null}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            disabled={isPending}
            variant="outline"
            className="rounded-xl border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-800"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-black px-6 hover:bg-zinc-800"
          >
            <Send className="mr-2 h-4 w-4" />
            {isPending ? "Publishing..." : "Publish Post"}
          </Button>
        </div>
      </form>
    </Card>
  );
}