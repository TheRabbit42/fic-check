export class ICheck {
    id = ''
    message = '';
    style = '';

    isInAnyParagraph(paragraphs) {
        return paragraphs.some((paragraph) => this.isInParagraph(paragraph))
    }

    isInParagraph() {
        return false;
    }

    getMessage(input, paragraphs){
        return(
            {
                text: this.message,
                style: this.isInAnyParagraph(paragraphs) ? this.style : 'success',
                href: `#${this.id}`
            }
        )
    }
}
