import { ExtraLineBreaks } from "@/checks/ExtraLineBreaks.js";
import { InvalidCapitalization } from "@/checks/InvalidCapitalization.js";
import { InvalidHtml } from "@/checks/InvalidHtml.js";
import { InvalidPunctuation } from "@/checks/InvalidPunctuation.js";
import { InvalidWhitespace } from "@/checks/InvalidWhitespace.js";
import { MissingApostrophes } from "@/checks/MissingApostrophes.js";
import { OverusedWords } from "@/checks/OverusedWords.js";
import { OverusedAdverbs } from "@/checks/OverusedAdverbs.js";
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
import { SingleCharacterEllipses } from "@/checks/SingleCharacterEllipses.js";
import { ApostropheQuote } from "@/checks/ApostropheQuote.js";

export const checklist = [
    new WordCount,
    new WordCountMultiple(),

    // Do early, since subsequent errors affect whitespace
    new InvalidWhitespace(),
    new QuoteSpacing,

    // The rest
    new InvalidCapitalization(),
    new InvalidPunctuation(),
    new UnsmoothAttribution(),
    new UnclosedQuotes(),
    new SmartQuotes(),
    new Swears(),
    new MissingApostrophes(),
    new ApostropheQuote(),
    new FinalPunctuation(),
    new UnaccentedNames(),
    new InvalidHtml(),
    new ExtraLineBreaks(),
    new SingleCharacterEllipses(),

    // Checks that produce lists
    new OverusedAdverbs(),
    new OverusedWords(),
    new RepeatPhrases(),
];
