export function caesarCipher(s, k) {
    let n = 26; // alphabet letters amount
    if (k < 0) {
        return caesarCipher(s, k + n);
    }
    return s.split('')
        .map(function (c) {
            if (c.match(/[a-z]/i)) {
                let code = c.charCodeAt();
                let shift = code >= 65 && code <= 90 ? 65 : code >= 97 && code <= 122 ? 97 : 0;
                return String.fromCharCode(((code - shift + k) % n) + shift);
            }
            return c;
        }).join('');
}

export function generateCode() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
