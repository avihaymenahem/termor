export default class StringValidator {
    unvalidatedString = null;
    stringLabel = null;

    constructor(string, stringLabel) {
        this.unvalidatedString = string;
        this.stringLabel = stringLabel;
        return this;
    }

    checkLength(minLength, maxLength) {
        if(!this.unvalidatedString) {
            throw `${this.stringLabel} cannot be empty`;
        }

        const strLength = this.unvalidatedString.length;

        if(minLength && strLength < minLength) {
            throw `Too short ${this.stringLabel}, min length is ${minLength}`;
        }

        if(maxLength && strLength > maxLength) {
            throw `Too long ${this.stringLabel}, max length is ${maxLength}`;
        }

        return this;
    }
} 