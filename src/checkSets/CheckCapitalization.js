import { ICheckSet } from "./ICheckSet.js";
import { InvalidCapitalization } from "@/checks/InvalidCapitalization.js";
import { UncapitalizedNames } from "@/checks/UncapitalizedNames.js";

export class CheckCapitalization extends ICheckSet {
    id = this.constructor.name;
    message = 'Proper capitalization';
    checks = [
        new InvalidCapitalization(),
        new UncapitalizedNames(),
    ];
}
