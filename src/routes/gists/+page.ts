import type { PageLoad } from "./$types";

class CodeBlock {
    filename: string
    code: string

    constructor(filename: string, code: string) {
        this.filename = filename;
        this.code = code;
    }
}

class Gist {
    timestamp: Date
    codeblocks: CodeBlock[]
    title: string
    description: string

    constructor(timestamp: Date, codeblocks: CodeBlock[], title: string, description: string) {
        this.timestamp = timestamp;
        this.codeblocks = codeblocks;
        this.title = title;
        this.description = description;
    }
}

export const load: PageLoad = async () => {
    let gists: Gist[] = [];


    return { gists: gists }
};