import { ICheck } from "./ICheck.js";

export class Swears extends ICheck {
    id = 'swear';
    message = 'No swears';
    style = 'warning';

    regex = /bitch|cunt|fuck|shit/gi;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    renderParagraph(paragraph) {
        return paragraph.replace(this.regex, (match) => this.genericHighlight(match));
    }
}
