import { ICheck } from "@/checks/ICheck.js";

export class RepeatWhitespace extends ICheck {
    id = "whitespace"
    message = 'All paragraphs free of repeat whitespace';
    style = 'error';

    regex = /\s{2,}/gi;

    isInParagraph(paragraph) {
        const initialLength = paragraph.length;
        paragraph = paragraph.replace(this.regex, ' ');
        const finalLength = paragraph.length;
        return initialLength != finalLength;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
