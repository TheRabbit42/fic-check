import { ICheck } from "@/checks/ICheck.js";

export class ExtraLineBreaks extends ICheck {
    id = 'linebreaks';
    message = 'Text free of extra line breaks';
    style = 'error';

    isInAnyParagraph(paragraphs) {
        return false;
    }

    getMessage(input, paragraphs){
        const extraLineBreaks = (input.value.match(/\n{3,}/gim) || [])

        return(
            {
                text: this.message,
                style: extraLineBreaks.length > 0 ? this.style : 'success',
                href: `#${this.id}`
            }
        )
    }
}
