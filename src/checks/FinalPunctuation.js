import { ICheck } from "./ICheck.js";

export class FinalPunctuation extends ICheck {
    id = "finalpunc"
    message = 'Text free of invalid final punctuation';
    style = 'error';

    regex = /([^\n\r!?:—.")>]"?$)|([^\n\r!?:—.")>]"?(?:<\/?\w*\/?>"?)$)/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<mark class="anchor-offset" id="${this.id}"></mark><mark class="highlight-${this.style}">$&</mark>`);
    }
}
