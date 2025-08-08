import { ExtraLineBreaks } from "@/checks/ExtraLineBreaks.js";
import { InvalidHtml } from "@/checks/InvalidHtml.js";
import { InvalidWhitespace } from "@/checks/InvalidWhitespace.js";
import { MissingApostrophes } from "@/checks/MissingApostrophes.js";
import { OverusedWords } from "@/checks/OverusedWords.js";
import { QuoteSpacing } from "@/checks/QuoteSpacing.js";
import { RepeatPhrases } from "@/checks/RepeatPhrases.js";
import { RepeatWords } from "@/checks/RepeatWords.js";
import { SmartQuotes } from "@/checks/SmartQuotes.js";
import { Swears } from "@/checks/Swears.js";
import { UnaccentedNames } from "@/checks/UnaccentedNames.js";
import { UnclosedQuotes } from "@/checks/UnclosedQuotes.js";
import { UnsmoothAttribution } from "@/checks/UnsmoothAttribution.js";
import { WordCount } from "@/checks/WordCount.js";
import { WordCountMultiple } from "@/checks/WordCountMultiple.js";

export const checklist = [
    new WordCount,
    new WordCountMultiple(),
    new UnclosedQuotes(),
    new Swears(),
    new SmartQuotes(),
    new MissingApostrophes(),
    new UnaccentedNames(),
    new RepeatWords(),
    new UnsmoothAttribution(),
    new InvalidHtml(),
    new InvalidWhitespace(),
    new ExtraLineBreaks(),
    new QuoteSpacing,
    //new OverusedWords(),
    new RepeatPhrases()
];
