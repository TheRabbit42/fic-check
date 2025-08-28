import { ICheck } from "./ICheck.js";

export class FinalPunctuation extends ICheck {
    id = "finalpunc"
    message = 'Text free of invalid final punctuation';
    style = 'error';

    regex = /([^!?:—.">]"?$)|(\w"?(?:<\/?\w*\/?>"?)$)/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
