import { ICheckSet } from "./ICheckSet.js";
import { IncompleteEllipses } from "@/checks/IncompleteEllipses.js";
import { UnclosedQuotes } from "@/checks/UnclosedQuotes.js";
import { SmartQuotes } from "@/checks/SmartQuotes.js";
import { MissingApostrophes } from "@/checks/MissingApostrophes.js";
import { ApostropheQuote } from "@/checks/ApostropheQuote.js";
import { FinalPunctuation } from "@/checks/FinalPunctuation.js";
import { InvalidHtml } from "@/checks/InvalidHtml.js";
import { SingleCharacterEllipses } from "@/checks/SingleCharacterEllipses.js";

export class CheckPunctuation extends ICheckSet {
    id = this.constructor.name;
    message = 'Proper punctuation';
    checks = [
        new IncompleteEllipses(),
        new UnclosedQuotes(),
        new SmartQuotes(),
        new MissingApostrophes(),
        new ApostropheQuote(),
        new FinalPunctuation(),
        new InvalidHtml(),
        new SingleCharacterEllipses(),
    ];
}
