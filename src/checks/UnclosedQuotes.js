import { ICheck } from "@/checks/ICheck.js";

export class UnclosedQuotes extends ICheck {
    id = 'quote';
    message = 'All paragraphs free of unclosed quotes';
    style = 'error';

    isInParagraph(paragraph) {
        const regex = /"/gi;
        return (paragraph.match(regex) || []).length % 2 > 0;
    }

    render(paragraph) {
        const regex = /"/g;
        return paragraph.replace(regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
