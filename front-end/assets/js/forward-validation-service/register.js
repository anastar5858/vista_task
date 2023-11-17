// email section
const validateEmail = (emailInput, passwordInput, passwordValidator) => {
    const email = emailInput.current.value.trim().toLowerCase();
    // no empty emails
    if (email === '') return uiEmailErrorHandler('Empty Email', emailInput);
    // against regular expression
    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.match(re)) return uiEmailErrorHandler('Invalid Email', emailInput);
    // make sure password is complying to the rules of the system before sending a request to the backend app
    // if any do not add the animation
    if (!passwordValidator.long) passwordAnimationHandler('pass-val-long');
    if (!passwordValidator.startEndNo) passwordAnimationHandler('pass-val-sten');
    if (!passwordValidator.chacractersLimit) passwordAnimationHandler('pass-val-limit');
    if (!passwordValidator.long || !passwordValidator.startEndNo || !passwordValidator.chacractersLimit) return
    // forward to server controller (api router)
    console.log(passwordInput.current.value, passwordValidator);
}
const passwordAnimationHandler = (id) => {
    const markElement = document.getElementById(id);
    markElement.style.animation = `validationY 2s 1`;
    setTimeout(() => markElement.style.animation = `none`, 1500);
}
const uiEmailErrorHandler = (message, emailInput) => {
    if (message === 'Empty Email') {
        emailInput.current.placeholder = message;
    } else if (message === 'Invalid Email') {
        const currentText = emailInput.current.value;
        emailInput.current.disabled = true;
        emailInput.current.value = message;
        emailInput.current.style.color = 'red';
        setTimeout(() => {
            emailInput.current.disabled = false;
            emailInput.current.value = currentText;
            emailInput.current.style.color = 'black';
        }, 1000);
    }
}
// password section
const validatePassword = (passwordInput, setPasswordValidator) => {
    // longer than 8 characters
    if (passwordInput.length > 8) {
        setPasswordValidator((prev) => {
            return {...prev, long: true};
        })
    } else {
        setPasswordValidator((prev) => {
            return {...prev, long: false};
        }) 
    }
    // does not start or end with a number
    if (isNaN(passwordInput[0]) && isNaN(passwordInput[passwordInput.length - 1])) {
        setPasswordValidator((prev) => {
            return {...prev, startEndNo: true};
        }) 
    } else {
        setPasswordValidator((prev) => {
            return {...prev, startEndNo: false};
        }) 
    }
    // has at least one symbol, one capita and one number
    let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    if (passwordInput.match(re)) {
        setPasswordValidator((prev) => {
            return {...prev, chacractersLimit: true};
        }) 
    } else {
        setPasswordValidator((prev) => {
            return {...prev, chacractersLimit: false};
        }) 
    }
    console.log(passwordInput);
}