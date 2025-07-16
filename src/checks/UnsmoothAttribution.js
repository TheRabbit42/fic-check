import { ICheck } from "@/checks/ICheck.js";

export class UnsmoothAttribution extends ICheck {
    id = 'attribution';
    message = 'All paragraphs free of unsmooth attributions';
    style = 'warning';

    isInParagraph(paragraph) {
        const regex = /[?!]" [A-Z][ A-z]+ (said|asked)/g;
        return (paragraph.match(regex) || []).length > 0;
    }

    render(paragraph) {
        const regex = /[?!]" [A-Z][ A-z]+ (said|asked)/g; // "h!" S
        return paragraph.replace(regex, `<span id="${this.id}" class="highlight-${this.style}">$&</span>`);
    }
}
