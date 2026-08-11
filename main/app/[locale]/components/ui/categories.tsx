"use client";

import {
  Heart,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

export type PostSortMode = "liked" | "comments" | "recent" | "popular";

const categories = [
  {
    id: "liked",
    label: "Most Liked",
    icon: Heart,
  },
  {
    id: "comments",
    label: "Most Comments",
    icon: MessageCircle,
  },
  {
    id: "recent",
    label: "Newest",
    icon: Clock,
  },
  {
    id: "popular",
    label: "Popular",
    icon: Sparkles,
  },
];

type PostCategoriesProps = {
  active: PostSortMode;
  onChange: (mode: PostSortMode) => void;
};

export default function PostCategories({ active, onChange }: PostCategoriesProps) {
  const t = useTranslations("categories");

  return (
    <div className="flex w-full flex-col gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = active === category.id;

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category.id as PostSortMode)}
            className={`
              group flex w-full items-center gap-3 rounded-xl
              border px-4 py-3 text-left text-sm font-medium
              transition-all duration-200
              ${
                isActive
                  ? "border-black bg-black text-white shadow-md"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50 hover:text-black"
              }
            `}
          >
            <Icon
              size={17}
              className={`shrink-0 transition-transform duration-200 ${
                isActive
                  ? "fill-white"
                  : "group-hover:scale-110"
              }`}
            />

            <span>{t(category.id)}</span>
          </button>
        );
      })}
    </div>
  );
}