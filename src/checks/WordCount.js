import { ICheck } from "./ICheck.js";
import { countWords } from "@/helpers/stringHelpers.js";

export class WordCount extends ICheck {
    message = 'Word count';
    style = 'error';

    isInAnyParagraph(paragraphs) {
        return false;
    }

    getMessage(input, paragraphs){
        return(
            {
                id: this.id,
                text: `${countWords(input.value)} words`,
                style: '',
                href: `#${this.id}`
            }
        )
    }
}
