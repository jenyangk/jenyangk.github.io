const BOOKS = [
    {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        take: "still the best explainer",
    },
    {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        take: "the systems book I keep returning to",
    },
    {
        title: "Meditations",
        author: "Marcus Aurelius",
        take: "quiet advice on doing the work",
    },
];

export function Reading() {
    return (
        <section className="mb-24">
            <h2 className="font-serif text-2xl font-bold text-text mb-6">
                Recently read
            </h2>
            <ul className="space-y-3 max-w-[65ch]">
                {BOOKS.map((book) => (
                    <li key={book.title} className="text-sm leading-relaxed">
                        <span className="font-serif italic text-text">
                            {book.title}
                        </span>
                        <span className="text-text-muted"> — {book.author} </span>
                        <span className="text-text-muted">
                            ({book.take})
                        </span>
                    </li>
                ))}
            </ul>
            <p className="mt-8 font-mono text-xs text-text-muted">
                Off the screen: badminton, cooking, astrophotography on clear
                nights.
            </p>
        </section>
    );
}