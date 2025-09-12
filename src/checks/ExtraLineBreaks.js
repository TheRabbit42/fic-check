import { ICheck } from "./ICheck.js";

export class ExtraLineBreaks extends ICheck {
    message = 'No extra line breaks';
    style = 'error';

    isInAnyParagraph(paragraphs) {
        return false;
    }

    getMessage(input, paragraphs){
        const extraLineBreaks = (input.value.match(/\n{3,}/gim) || [])

        return(
            {
                id: this.id,
                text: this.message,
                style: extraLineBreaks.length > 0 ? this.style : 'success',
            }
        )
    }

    genericHighlight(wrappedContent) {
        return `${wrappedContent}<br/><a href="#" id="${this.id}-${this.matchCount++}" class="highlight highlight-${this.style}">BREAK</a>`;
    }
}
