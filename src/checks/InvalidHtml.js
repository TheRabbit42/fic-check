import { ICheck } from "./ICheck.js";

export class InvalidHtml extends ICheck {
    id = 'html';
    message = 'Text free of invalid html';
    style = 'error';
    tags = ['em', 'strong', 'li']

    isInParagraph(paragraph) {
        for (let tag of this.tags) {
            let match1 = new RegExp(`<>`, 'gi');
            let match2 = new RegExp(`</>`, 'gi');
            if ((paragraph.match(match1) || []).length != (paragraph.match(match2) || []).length)
            {
                return true;
            }
        }

        for (let tag of this.tags) {
            let match1 = new RegExp(`<${tag}>`, 'gi');
            let match2 = new RegExp(`<\/${tag}>`, 'gi');
            if ((paragraph.match(match1) || []).length != (paragraph.match(match2) || []).length)
            {
                return true;
            }
        }
        return false;
    }

    render(paragraph) {
        for (let tag of this.tags) {
            if (this.isParaWithUnopenedTag(paragraph, tag)) {
                let regex = new RegExp(`<\/${tag}>`, 'gi');
                paragraph = paragraph.replace(regex, `<span id="${this.id}" class="highlight-${this.style}">[${tag}]</span>$&`);
            } else if (this.isParaWithUnclosedTag(paragraph, tag)) {
                let regex = new RegExp(`<${tag}>`, 'gi');
                paragraph = paragraph.replace(regex, `[${tag}]$&<span id="${this.id}" class="highlight-${this.style}"/>`);
            }
        }

        return paragraph;
    }

    isParaWithUnopenedTag(paragraph, tag) {
        let match1 = new RegExp(`<${tag}>`, 'gi');
        let match2 = new RegExp(`<\/${tag}>`, 'gi');
        return (paragraph.match(match1) || []).length < (paragraph.match(match2) || []).length
    }

    isParaWithUnclosedTag(paragraph, tag) {
        let match1 = new RegExp(`<${tag}>`, 'gi');
        let match2 = new RegExp(`<\/${tag}>`, 'gi');
        return (paragraph.match(match1) || []).length > (paragraph.match(match2) || []).length
    }
}
