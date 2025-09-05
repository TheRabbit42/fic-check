import { ICheck } from "./ICheck.js";

export class InvalidWhitespace extends ICheck {
    id = "whitespace"
    message = 'Proper whitespace';
    style = 'error';

    regex = /(\s{2,})|([a-zA-Z]\s[\.,;:?!]\w)|([a-zA-Z][\.,;:?!]\w)|(\w[\.,;:?!][a-zA-Z])/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
