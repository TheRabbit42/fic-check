export class ICheck {
    id = this.constructor.name;

    message = '';
    style = '';
    matchCount = 0;

    reset() {
        this.matchCount = 0;
    }

    isInAnyParagraph(paragraphs) {
        return paragraphs.some((paragraph) => this.isInParagraph(paragraph))
    }

    isInParagraph() {
        return false;
    }

    getMessage(input, paragraphs){
        return(
            {
                id: this.id,
                text: this.message,
                style: this.isInAnyParagraph(paragraphs) ? this.style : 'success',
                renderAdditional: this.renderAdditional(),
            }
        )
    }

    renderParagraph(paragraph) {
        return paragraph;
    }

    renderAdditional() {
        return '';
    }

    genericHighlight(wrappedContent) {
        return `<a href="#" id="${this.id}-${this.matchCount++}" class="highlight highlight-${this.style}">${wrappedContent}</a>`;
    }
}
