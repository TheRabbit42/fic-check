import { ICheck } from "@/checks/ICheck.js";

export class QuoteSpacing extends ICheck {
    id = 'quotespacing';
    message = 'All paragraphs free of incorrect quote spacing';
    style = 'error';

    regex = /(^"\s)|(\s"\s)|(\s"$)/gim;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
