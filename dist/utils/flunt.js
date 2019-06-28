"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Flunt {
    constructor(errors = []) {
        this.errors = errors;
        this.hasMinLen = (value, min, message) => {
            if (!value || value.length < min) {
                this.errors.push(message);
            }
        };
        this.hasMaxLen = (value, max, message) => {
            if (!value || value.length > max) {
                this.errors.push(message);
            }
        };
        this.isFixedLen = (value, len, message) => {
            if (value.length !== len) {
                this.errors.push(message);
            }
        };
        this.isEmail = (value, message) => {
            const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
            if (!reg.test(value)) {
                this.errors.push(message);
            }
        };
        this.isNotNull = (value, message) => {
            if (!value.length) {
                this.errors.push(message);
            }
        };
        this.isGreaterThan = (valuea, valueb, message) => {
            if (valuea > valueb) {
                this.errors.push(message);
            }
        };
        this.isCpf = (value, message) => {
            let valid = true;
            if (value === null) {
                valid = false;
            }
            if (!value || value.length !== 11) {
                valid = false;
            }
            if ((value === '00000000000') ||
                (value === '11111111111') ||
                (value === '22222222222') ||
                (value === '33333333333') ||
                (value === '44444444444') ||
                (value === '55555555555') ||
                (value === '66666666666') ||
                (value === '77777777777') ||
                (value === '88888888888') ||
                (value === '99999999999')) {
                valid = false;
            }
            let number = 0;
            let caracter = '';
            const numbers = '0123456789';
            let j = 10;
            let sum = 0;
            let rest = 0;
            let digit1 = 0;
            let digit2 = 0;
            let valueAux = '';
            if (value) {
                valueAux = value.substring(0, 9);
            }
            for (let i = 0; i < 9; i++) {
                caracter = valueAux.charAt(i);
                if (numbers.search(caracter) === -1) {
                    valid = false;
                }
                number = Number(caracter);
                sum = sum + (number * j);
                j--;
            }
            rest = sum % 11;
            digit1 = 11 - rest;
            if (digit1 > 9) {
                digit1 = 0;
            }
            j = 11;
            sum = 0;
            valueAux = valueAux + digit1;
            for (let i = 0; i < 10; i++) {
                caracter = valueAux.charAt(i);
                number = Number(caracter);
                sum = sum + (number * j);
                j--;
            }
            rest = sum % 11;
            digit2 = 11 - rest;
            if (digit2 > 9) {
                digit2 = 0;
            }
            valueAux = valueAux + digit2;
            if (value !== valueAux) {
                valid = false;
            }
            if (!valid) {
                this.errors.push(message);
            }
        };
    }
    isRequired(value, message) {
        if (!value || value.length <= 0) {
            this.errors.push(message);
        }
    }
    clear() {
        this.errors = [];
    }
    isValid() {
        return this.errors.length === 0;
    }
}
exports.Flunt = Flunt;
//# sourceMappingURL=flunt.js.map