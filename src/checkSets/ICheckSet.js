export class ICheckSet {
    id = this.constructor.name;
    message = '';
    checks = [];

    reset() {
        this.checks.forEach((check) => check.reset());
    }

    isInAnyParagraph(paragraphs) {
        return this.checks.some((check) => check.isInAnyParagraph(paragraphs));
    }

    isInParagraph(paragraph) {
        return this.checks.some((check) => check.isInParagraph(paragraph));
    }

    getMessages(input, paragraphs){
        let messages = this.checks.map((check) => check.getMessage(input, paragraphs));
        messages = messages.filter((message) => message.style !== 'success');
        if (messages.length > 0) {
            return messages;
        }

        return(
            {
                id:  this.constructor.name,
                text: this.message,
                style: 'success',
                href: `#${this.constructor.name}`,
            }
        )
    }

    renderParagraph(paragraph) {
        for (const check of this.checks) {
            if (check.isInParagraph(paragraph)) {
                paragraph = check.renderParagraph(paragraph);
            }
        }
        return paragraph;
    }
e}
