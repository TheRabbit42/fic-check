import { ExtraLineBreaks } from "@/checks/ExtraLineBreaks.js";
import { InvalidCapitalization } from "@/checks/InvalidCapitalization.js";
import { InvalidHtml } from "@/checks/InvalidHtml.js";
import { InvalidPunctuation } from "@/checks/InvalidPunctuation.js";
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
import { FinalPunctuation } from "@/checks/FinalPunctuation.js";

export const checklist = [
    new WordCount,
    new WordCountMultiple(),
    new UnclosedQuotes(),
    new Swears(),
    new SmartQuotes(),
    new MissingApostrophes(),
    new FinalPunctuation(),
    new UnaccentedNames(),
    new RepeatWords(),
    //new OverusedWords(),
    new UnsmoothAttribution(),
    new InvalidCapitalization(),
    new InvalidHtml(),
    new InvalidPunctuation(),
    new InvalidWhitespace(),
    new ExtraLineBreaks(),
    new QuoteSpacing,
    new RepeatPhrases()
];
