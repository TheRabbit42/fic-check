import { ICheck } from "@/checks/ICheck.js";

export class RepeatWhitespace extends ICheck {
    id = "whitespace"
    message = 'All paragraphs free of repeat whitespace';
    style = 'error';

    isInParagraph(paragraph) {
        const initialLength = paragraph.length;
        paragraph = paragraph.replace(/\s{2,}/gi, ' ');
        const finalLength = paragraph.length;
        return initialLength != finalLength;
    }

    render(paragraph) {
        const regex = /\s{2,}/gi;
        return paragraph.replace(regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
