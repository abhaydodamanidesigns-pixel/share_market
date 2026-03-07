import Link from "next/link";

interface ArticleCardDict {
  readSuffix: string;
  readArticle: string;
}

interface ArticleCardProps {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  /** Emoji or icon character representing the article theme */
  coverEmoji?: string;
  /** Optional custom href; defaults to /resources/{slug} */
  href?: string;
  /** Optional dict for i18n */
  dict?: ArticleCardDict;
}

export default function ArticleCard({
  slug,
  category,
  title,
  excerpt,
  readTime,
  date,
  coverEmoji = "📄",
  href: hrefProp,
  dict,
}: ArticleCardProps) {
  const readSuffix = dict?.readSuffix ?? "read";
  const readArticlePrefix = dict?.readArticle ?? "Read article:";
  const href = hrefProp ?? `/resources/${slug}`;
  return (
    <article className="card group flex flex-col h-full">
      {/* Cover placeholder */}
      <div
        className="w-full h-36 rounded-xl bg-gradient-to-br from-dark-card to-dark-elevated flex items-center justify-center text-5xl mb-4"
        aria-hidden="true"
      >
        {coverEmoji}
      </div>

      {/* Category badge */}
      <span className="badge bg-dark-card text-brand mb-2">{category}</span>

      {/* Title */}
      <h3 className="text-base font-semibold text-ink leading-snug mb-2 group-hover:text-brand transition-colors">
        <Link
          href={href}
          className="stretched-link"
          aria-label={`${readArticlePrefix} ${title}`}
        >
          {title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-ink-dim leading-relaxed mb-4 flex-1 line-clamp-3">
        {excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-ink-muted pt-3 border-t border-dark-border">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
        <span aria-hidden="true">·</span>
        <span>{readTime} {readSuffix}</span>
      </div>
    </article>
  );
}
