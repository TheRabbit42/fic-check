import { ICheck } from "@/checks/ICheck.js";

export class Swears extends ICheck {
    id = 'swear';
    message = 'All paragraphs free of swears';
    style = 'warning';

    isInParagraph(paragraph) {
        const regex = /bitch|cunt|fuck|shit/gi;
        return (paragraph.match(regex) || []).length > 0;
    }

    render(paragraph) {
        const regex = /bitch|cunt|fuck|shit/gi;
        return paragraph.replace(regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
