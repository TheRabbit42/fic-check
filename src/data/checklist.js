import { CheckWhitespace } from "@/checkSets/CheckWhitespace.js";
import { CheckWordCounts } from "@/checkSets/CheckWordCounts.js";
import { CheckPunctuation } from "@/checkSets/CheckPunctuation.js";
import { CheckCapitalization } from "@/checkSets/CheckCapitalization.js";
import { CheckStyle } from "@/checkSets/CheckStyle.js";

export const checklist = [
    new CheckWordCounts(),
    new CheckWhitespace(),
    new CheckPunctuation(),
    new CheckCapitalization(),
    new CheckStyle(),
];
