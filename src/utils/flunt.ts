export class Flunt {
    constructor(public errors: any[] = []) { }

    isRequired(value, message) {
        if (!value || value.length <= 0) {
            this.errors.push(message);
        }
    }

    hasMinLen = (value, min, message) => {
        if (!value || value.length < min) {
            this.errors.push(message);
        }
    }

    hasMaxLen = (value, max, message) => {
        if (!value || value.length > max) {
            this.errors.push(message);
        }
    }

    isFixedLen = (value, len, message) => {
        if (value.length !== len) {
            this.errors.push(message);
        }
    }

    isEmail = (value, message) => {
        const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

        if (!reg.test(value)) {
            this.errors.push(message);
        }
    }

    isNotNull = (value, message) => {
        if (!value.length) {
            this.errors.push(message);
        }
    }

    isGreaterThan = (valuea, valueb, message) => {
        if (valuea > valueb) {
            this.errors.push(message);
        }
    }

    clear() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length === 0;
    }

    isCpf = (value, message) => {
        let valid: boolean = true;

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

// tslint:disable-next-line: variable-name
        let number: number = 0;
        let caracter: string = '';
        const numbers: string = '0123456789';
        let j: number = 10;
        let sum: number = 0;
        let rest: number = 0;
        let digit1: number = 0;
        let digit2: number = 0;
        let valueAux: string = '';

        if (value) {
            valueAux = value.substring(0, 9);
        }

        for (let i: number = 0; i < 9; i++) {
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

        for (let i: number = 0; i < 10; i++) {
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
    }
}
