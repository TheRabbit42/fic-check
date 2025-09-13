import { InvalidWhitespace } from "@/checks/InvalidWhitespace.js";
import { QuoteSpacing } from "@/checks/QuoteSpacing.js";
import { ExtraLineBreaks } from "@/checks/ExtraLineBreaks.js";
import { ICheckSet } from "./ICheckSet.js";

export class CheckWhitespace extends ICheckSet {
    id = this.constructor.name;
    message = 'Proper whitespace';
    checks = [
        new InvalidWhitespace(),
        new QuoteSpacing,
        new ExtraLineBreaks(),
    ];
}
