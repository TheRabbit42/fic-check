import { ICheck } from "./ICheck.js";

export class Swears extends ICheck {
    id = 'swear';
    message = 'Text free of swears';
    style = 'warning';

    regex = /bitch|cunt|fuck|shit/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
