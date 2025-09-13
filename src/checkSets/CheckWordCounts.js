import { WordCount } from "@/checks/WordCount.js";
import { WordCountMultiple } from "@/checks/WordCountMultiple.js";
import { ICheckSet } from "./ICheckSet.js";

export class CheckWordCounts extends ICheckSet {
    id = this.constructor.name;
    message = '';
    checks = [
        new WordCount(),
        new WordCountMultiple(),
    ];

    getMessages(input, paragraphs){
        return this.checks.map((check) => check.getMessage(input, paragraphs));
    }
}
