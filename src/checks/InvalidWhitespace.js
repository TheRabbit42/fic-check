import { ICheck } from "./ICheck.js";

export class InvalidWhitespace extends ICheck {
    id = "whitespace"
    message = 'Text free of invalid whitespace';
    style = 'error';

    regex = /(\s{2,})|([a-zA-Z][\.,;:?!]\w)|(\w[\.,;:?!][a-zA-Z])/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span class="anchor-offset" id="${this.id}"></span><span class="highlight-${this.style}">$&</span>`);
    }
}
