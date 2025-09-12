import { ICheck } from "./ICheck.js";
import { countWords } from "@/helpers/stringHelpers.js";

export class WordCountMultiple extends ICheck {
    message = 'Word count is a multiple of 500';
    style = 'error';

    isInAnyParagraph(paragraphs) {
        return false;
    }

    getMessage(input, paragraphs){
        return(
            {
                id: this.id,
                text: this.message,
                style: countWords(input.value) % 500 > 0 ? this.style : 'success',
            }
        )
    }
}
