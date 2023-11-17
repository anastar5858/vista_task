const validatePassword = (password) => {
    // longer than 8 characters
    if (password.length < 8) {
        return {state: false, id: 'pass-val-long'};
    }
    // does not start or end with a number
    if (!isNaN(password[0]) || !isNaN(password[password.length - 1])) {
        return {state: false, id: 'pass-val-sten'};
    }
    // has at least one symbol, one capita and one number
    let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    if (!password.match(re)) {
        return {state: false, id: 'pass-val-limit'};
    }
    return {state: true};
}

module.exports = {
    validatePassword,
}