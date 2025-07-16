import { ICheck } from "@/checks/ICheck.js";

export class SmartQuotes extends ICheck {
    id = "accent"
    message = 'All paragraphs free of smart quotes';
    style = 'error';

    isInParagraph(paragraph) {
        const regex = /[‘’’“”]/gi;
        return (paragraph.match(regex) || []).length % 2 > 0;
    }

    render(paragraph) {
        const regex = /[‘’’“”]/gi;
        return paragraph.replace(regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
