import { BookOpen } from "lucide-react";

interface Book {
  title: string;
  author: string;
  url: string;
  status: "Reading" | "Completed" | "Reference";
}

const books: Book[] = [
  {
    title: "AI Engineering",
    author: "Chip Huyen",
    url: "https://learning.oreilly.com/library/view/ai-engineering/9781098166298/",
    status: "Reading",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    url: "https://learning.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/",
    status: "Reference",
  },
  {
    title: "Algorithmic Trading",
    author: "Ernest P. Chan",
    url: "https://www.wiley.com/en-ca/Algorithmic+Trading",
    status: "Reading",
  },
];

export function ReadingAttachment() {
  return (
    <div className="space-y-3">
      {books.map((book, i) => (
        <a
          key={i}
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 group hover:opacity-70 transition-opacity"
        >
          <BookOpen className="w-4 h-4 text-curator mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-text group-hover:underline underline-offset-4">
              {book.title}
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              {book.author} ·{" "}
              <span className="font-mono text-[10px] uppercase tracking-wider">
                {book.status}
              </span>
            </p>
          </div>
        </a>
      ))}

      <div className="pt-2 border-t border-border-subtle">
        <p className="text-xs text-text-muted leading-relaxed">
          Also exploring: agent orchestration, LLM systems design, LangGraph,
          and building experimental AI tools.
        </p>
      </div>
    </div>
  );
}
