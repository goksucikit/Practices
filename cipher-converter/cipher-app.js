const textarea = document.querySelector('[name="text"]');
const button = document.querySelector('.button');
const result = document.querySelector('.result');


const cipher = {
     '!': 'ᵎ', '?': 'ˀ', '0': '9', '1': '8', '2': '7', '4': '6', '5': '0', '6': '4', '7': '3', '8': '2', '9': '1', A: 'B', B: 'V', C: 'G', D: 'Q', E: 'K', F: 'M', G: 'N', H: 'A', I: 'D', J: 'Z', K: 'C', L: 'W', M: 'S', N: 'E', O: 'O', P: 'Y', Q: 'F', R: 'J', S: 'X', T: 'H', U: 'T', V: 'L', W: 'P', X: 'U', Y: 'I', Z: 'R', ' ': "11",
}

const enigma = (letter) => {
    let cipherLetter = cipher[letter.toUpperCase()];
    if (cipherLetter) return cipherLetter;
}

function textConverter (text) {
    const cryptedText = text
    .split('')
    .map(enigma);
    
    result.textContent = cryptedText.join('');
}

textarea.addEventListener('input', e => textConverter(e.target.value));
button.addEventListener('click', () => {
    location.reload();
    console.log('DONE');
});

