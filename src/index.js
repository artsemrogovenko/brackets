module.exports = function check(str, bracketsConfig) {

    openBrackets = getOpenBrackets(bracketsConfig);
    closeBrackets = getCloseBrackets(bracketsConfig);

    return recursive(str);
}

function getOpenBrackets(config) {
    let firstBrackets = [];
    for (let i = 0; i < config.length; i++) {
        firstBrackets[i] = config[i][0]; // символ и количество 0
    }
    return firstBrackets.join('');
}

function getCloseBrackets(config) {
    let secondBrackets = [];
    for (let i = 0; i < config.length; i++) {
        secondBrackets[i] = config[i][1]; // символ и количество 0
    }
    return secondBrackets.join('');
}


function recursive(string) {
    console.log(string);
    if (string.length % 2 !== 0 || string.length === 1) {
        return false;
    }
    if (string.length === 2) { // условие для выхода из рекурсии
        return openBrackets.includes(string[0]) && closeBrackets.includes(string[1]);
    }

    for (let i = 0; i < string.length; i++) {
        // console.log(`>>> ${i}`)
        if (closeBrackets.includes(string[i]) && i !== 0) { // если текущий элемент закрывающая скобка

            const index = closeBrackets.indexOf(string[i]); // получить комплиментарный индекс скобки
            const openSymbol = openBrackets[index]; // получить саму скобку

            if (string[i - 1] === openSymbol) { // проверить если предыдущий символ открывающий , этого же типа
                let newString = string.slice(0, i - 1) + string.slice(i + 1); // вырезаю фрагмент и передаю на новый цикл
                return recursive(newString);
            } else {
                let reverseIndex = i;
                do {
                    reverseIndex--;
                    if (reverseIndex < 0) {
                        break; // продолжу итерироваться по текущей строке
                    }

                } while (openSymbol !== string[reverseIndex]);

                if (reverseIndex !== -1) {
                    const inner = recursive(string.slice(reverseIndex + 1, i));

                    if (inner === undefined) {
                        console.log(`@@@@ ${string} @@@@`);
                    }
                    console.log(`${string.slice(0, reverseIndex)}${inner}${string.slice(i + 1)}`);
                    if (inner === true) {
                        return recursive(string.slice(0, reverseIndex) + string.slice(i + 1));
                    } else {
                        return false;
                    }
                }

            }
        }
    }
    return identicalCharacters(string);
}


function identicalCharacters(string) {
    const chr = string[0];
    let countChairs = 1;
    for (let k = 1; k < string.length; k++) {
        if (string[k] === chr) {
            countChairs++;
        }
        if (countChairs === string.length) {
            return true;
        }
    }
    return false;
}

let openBrackets = '';
let closeBrackets = '';
