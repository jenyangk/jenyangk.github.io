const BOOKS = [
    {
        title: "The Poverty of Historicism",
        author: "Karl Popper",
    },
    {
        title: "Designing Data-Intensive Applications, 2nd Edition",
        author: "Martin Kleppmann and Chris Riccomini",
    },
    {
        title: "AI Engineering",
        author: "Chip Huyen",
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
                    </li>
                ))}
            </ul>
            <p className="mt-8 font-mono text-xs text-text-muted">
                Off the screen: badminton, cooking, travelling, astrophotography on clear
                nights.
            </p>
        </section>
    );
}