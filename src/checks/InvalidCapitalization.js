import { ICheck } from "./ICheck.js";

export class InvalidCapitalization extends ICheck {
    id = "capitalization"
    message = 'Text free of invalid capitalization';
    style = 'error';

    regex = /(^"?[a-z])|(\w[.!?]{1,2}\s[a-z])/g;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
