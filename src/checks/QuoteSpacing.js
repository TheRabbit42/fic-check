import { ICheck } from "./ICheck.js";

export class QuoteSpacing extends ICheck {
    id = 'quotespacing';
    message = 'Text free of incorrect quote spacing';
    style = 'error';

    regex = /(^"\s)|(\s"\s)|(\s"$)/gim;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span class="anchor-offset" id="${this.id}"></span><span class="highlight-${this.style}">$&</span>`);
    }
}
