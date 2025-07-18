import { WordCount } from "@/checks/WordCount.js";
import { WordCountMultiple } from "@/checks/WordCountMultiple.js";
import { UnclosedQuotes } from "@/checks/UnclosedQuotes.js";
import { Swears } from "@/checks/Swears.js";
import { SmartQuotes } from "@/checks/SmartQuotes.js";
import { UnaccentedNames } from "@/checks/UnaccentedNames.js";
import { RepeatWhitespace } from "@/checks/RepeatWhitespace.js";
import { RepeatWords } from "@/checks/RepeatWords.js";
import { UnsmoothAttribution } from "@/checks/UnsmoothAttribution.js";
import { InvalidHtml } from "@/checks/InvalidHtml.js";
import { ExtraLineBreaks } from "@/checks/ExtraLineBreaks.js";
import { OverusedWords } from "@/checks/OverusedWords.js";
import { RepeatPhrases } from "@/checks/RepeatPhrases.js";

export const checklist = [
    new WordCount,
    new WordCountMultiple(),
    new UnclosedQuotes(),
    new Swears(),
    new SmartQuotes(),
    new UnaccentedNames(),
    new RepeatWhitespace(),
    new RepeatWords(),
    new UnsmoothAttribution(),
    new InvalidHtml(),
    new ExtraLineBreaks(),
    //new OverusedWords(),
    new RepeatPhrases()
];
