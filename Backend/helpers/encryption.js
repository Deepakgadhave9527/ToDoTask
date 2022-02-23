var bcrypt = require('bcryptjs');

function encrypt(plaintext) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plaintext, salt);

}

function compare(plaintext, cipherText) {
    return bcrypt.compare(plaintext, cipherText);
}

module.exports = { encrypt, compare }