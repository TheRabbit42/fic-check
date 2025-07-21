import { ICheck } from "@/checks/ICheck.js";

export class SmartQuotes extends ICheck {
    id = "accent"
    message = 'All paragraphs free of smart quotes';
    style = 'error';

    regex = /[‘’’“”]/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length % 2 > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
