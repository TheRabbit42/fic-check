import { ICheckSet } from "./ICheckSet.js";
import { UnaccentedNames } from "@/checks/UnaccentedNames.js";
import { UnsmoothAttribution } from "@/checks/UnsmoothAttribution.js";
import { Swears } from "@/checks/Swears.js";
import { OverusedAdverbs } from "@/checks/OverusedAdverbs.js";
import { OverusedWords } from "@/checks/OverusedWords.js";
import { RepeatPhrases } from "@/checks/RepeatPhrases.js";

export class CheckStyle extends ICheckSet {
    id = this.constructor.name;
    message = 'Proper style';
    checks = [
        new UnaccentedNames(),
        new UnsmoothAttribution(),
        new Swears(),
        // Checks that produce lists:
        new OverusedAdverbs(),
        new OverusedWords(),
        new RepeatPhrases(),
    ];
}
