import { GenericRegexCheck } from "./GenericRegexCheck.js";

export class MissingSpaceAroundQuote extends GenericRegexCheck {
    message = 'Missing space around quote';
    regex = /\w[.,]"\w/g;
}
