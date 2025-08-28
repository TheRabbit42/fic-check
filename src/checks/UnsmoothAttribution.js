import { ICheck } from "./ICheck.js";

export class UnsmoothAttribution extends ICheck {
    id = 'attribution';
    message = 'Text free of unsmooth attributions';
    style = 'warning';

    regex = /[?!]" [A-Z][ A-z]+ (said|asked)/g;

    isInParagraph(paragraph) {
        return (paragraph.match(this.regex) || []).length > 0;
    }

    render(paragraph) {
        return paragraph.replace(this.regex, `<span class="anchor-offset" id="${this.id}"></span><span class="highlight-${this.style}">$&</span>`);
    }
}
