const a = "a".charCodeAt(0); // 97
const A = "A".charCodeAt(0); // 65
const Z = "Z".charCodeAt(0); // 90
const z = "z".charCodeAt(0); // 122

export function caesar(input, offset) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
        if (isAlphabetic(input.charCodeAt(i))) {
            const cap = isCap(input[i]) ? A : a;
            result += String.fromCharCode(((input.charCodeAt(i) - cap + offset) % 26) + cap);
        } else {
            result += input[i];
        }
    }
    return result;
}

function isCap(c) {
    return c[0] === c[0].toUpperCase();
}

function isAlphabetic(i) {
    return (i >= a && i <= z) || (i >= A && i <= Z);
}
