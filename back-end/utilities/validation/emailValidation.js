const validateEmail = (email) => {
    // no empty emails
    if (email === '') return false
    // against regular expression
    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.match(re)) return false 
    return true
}


module.exports = {
    validateEmail,
}