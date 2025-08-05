import { ICheck } from "./ICheck.js";

export class UnsmoothAttribution extends ICheck {
    id = 'attribution';
    message = 'All paragraphs free of unsmooth attributions';
    style = 'warning';

    regex = /[?!]" [A-Z][ A-z]+ (said|asked)/g;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
