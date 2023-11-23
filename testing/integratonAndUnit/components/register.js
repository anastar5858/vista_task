const Register = (props) => {
    const language = props.language
    console.log(language);
    const [password, setPassword] = React.useState('');
    const [passwordValidator, setPasswordValidator] = React.useState({long: false, chacractersLimit: false, startEndNo: false});
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const [languageData, setLanguageData] = React.useState({});
    React.useEffect(() => {
        fetchLanguageData(setLanguageData);
    }, []);
    // live validation of password here
    React.useEffect(() => {
        validatePassword(password, setPasswordValidator);
    }, [password]);
    return  (
    <form className='flex-column surface'>
        <input id='register-input' ref={emailRef} className='w-30 middle front media-wide' type='email' placeholder={Object.keys(languageData).length > 0 ? languageData.register.emailPlaceholder[language] : ''} />
        <input id='password-input' ref={passwordRef} onInput={(e) => setPassword(e.currentTarget.value)} className='w-30 middle front media-wide' type='password' placeholder={Object.keys(languageData).length > 0 ? languageData.register.passwordPlaceholder[language] : ''} />
        <ul className='middle front bullet' dir={Object.keys(languageData).length > 0 ? languageData.direction[language] : ''}>
            <strong>{Object.keys(languageData).length > 0 ? languageData.register.compliance[language] : ''}</strong>
            <li>
                <mark id='pass-val-long'><strong>{Object.keys(languageData).length > 0 ? languageData.register.passwordRule1[language] : ''}</strong></mark>
                <input id='checkBoxBlock' type='checkbox' disabled checked={passwordValidator.long ? true : false} style={{margin: '0.2rem auto 0 auto',}}></input>
            </li>
            <li>
                <mark id='pass-val-limit'><strong>{Object.keys(languageData).length > 0 ? languageData.register.passwordRule2[language] : ''}</strong></mark>
                <input id='checkBoxBlock' type='checkbox' disabled checked={passwordValidator.chacractersLimit ? true : false} style={{margin: '0.2rem auto 0 auto',}}></input>
            </li>
            <li>
                <mark id='pass-val-sten'> <strong>{Object.keys(languageData).length > 0 ? languageData.register.passwordRule3[language] : ''}</strong></mark>
                <input id='checkBoxBlock' type='checkbox' disabled checked={passwordValidator.startEndNo ? true : false} style={{margin: '0.2rem auto 0 auto',}}></input>
            </li>
        </ul>
        <button id='regsiter-btn'onAnimationStart={() => {
            const hamburgerMenu = document.getElementById('menu-toggle2');
            const hamburgerMenu2 = document.getElementById('menu-toggle');
            if (hamburgerMenu && hamburgerMenu2) {
                hamburgerMenu.disabled = true;
                hamburgerMenu2.disabled = true; 
            }
        }} onAnimationEnd={() => {
            const hamburgerMenu = document.getElementById('menu-toggle2');
            const hamburgerMenu2 = document.getElementById('menu-toggle');
            if (hamburgerMenu && hamburgerMenu2) {
                hamburgerMenu.disabled = false;
                hamburgerMenu2.disabled = false; 
                hamburgerMenu.checked = false
            } 
        }} onClick={(e) => registerRequestForwarder(emailRef, passwordRef, e, passwordValidator, language, languageData)}
        onMouseEnter={(e) => e.currentTarget.style.animation = 'none'} 
        className='w-10 middle front primary-container' 
        style={{animation: `${props.animationIndicator === false ? 'btnTransition 3s 1 forwards' : 'default'}`}}>{Object.keys(languageData).length > 0 ? languageData.register.registerBtn[language] : ''}</button>
    </form>
    )
}
const registerRequestForwarder = (emailRef, passwordRef, event, passwordValidator, language, languageData) => {
    event.preventDefault();
    // forward to client-side controller
    validateEmail(emailRef, passwordRef, passwordValidator, language, languageData);
}


// // email section
// const validateEmail = (emailInput, passwordInput, passwordValidator, language, languageData) => {
//     const email = emailInput.current.value.trim().toLowerCase();
//     // no empty emails
//     // console.log(language, languageData, languageData.errors.emailEmpty[language])
//     if (email === '') return uiEmailErrorHandler(languageData.errors.emailEmpty[language], emailInput, 'Empty Email');
//     // against regular expression
//     const re =
//     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     if (!email.match(re)) return uiEmailErrorHandler(languageData.errors.emailInvalid[language], emailInput, 'Invalid Email');
//     // make sure password is complying to the rules of the system before sending a request to the backend app
//     // if any do not add the animation
//     if (!passwordValidator.long) passwordAnimationHandler('pass-val-long');
//     if (!passwordValidator.startEndNo) passwordAnimationHandler('pass-val-sten');
//     if (!passwordValidator.chacractersLimit) passwordAnimationHandler('pass-val-limit');
//     if (!passwordValidator.long || !passwordValidator.startEndNo || !passwordValidator.chacractersLimit) return
//     // forward to server controller (api router)
//     const password = passwordInput.current.value;
//     sendToServerController(emailInput, password, language, languageData);
// }
// const passwordAnimationHandler = (id) => {
//     const markElement = document.getElementById(id);
//     markElement.style.animation = `validationY 2s 1`;
//     markElement.addEventListener('animationend', () => {
//         markElement.style.animation = 'none';
//     }, { once: true });
// }
// const uiEmailErrorHandler = (lanMessage, emailInput, message) => {
//     if (message === 'Empty Email') {
//         emailInput.current.placeholder = lanMessage;
//     } else if (message === 'Invalid Email') {
//         const currentText = emailInput.current.value;
//         emailInput.current.disabled = true;
//         emailInput.current.value = lanMessage;
//         emailInput.current.style.color = 'red';
//         setTimeout(() => {
//             emailInput.current.disabled = false;
//             emailInput.current.value = currentText;
//             emailInput.current.style.color = 'black';
//         }, 1000);
//     }
// }
// // password section
// const validatePassword = (passwordInput, setPasswordValidator) => {
//     // longer than 8 characters
//     if (passwordInput.length > 8) {
//         setPasswordValidator((prev) => {
//             return {...prev, long: true};
//         })
//     } else {
//         setPasswordValidator((prev) => {
//             return {...prev, long: false};
//         }) 
//     }
//     // does not start or end with a number
//     if (isNaN(passwordInput[0]) && isNaN(passwordInput[passwordInput.length - 1])) {
//         setPasswordValidator((prev) => {
//             return {...prev, startEndNo: true};
//         }) 
//     } else {
//         setPasswordValidator((prev) => {
//             return {...prev, startEndNo: false};
//         }) 
//     }
//     // has at least one symbol, one capita and one number
//     let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
//     if (passwordInput.match(re)) {
//         setPasswordValidator((prev) => {
//             return {...prev, chacractersLimit: true};
//         }) 
//     } else {
//         setPasswordValidator((prev) => {
//             return {...prev, chacractersLimit: false};
//         }) 
//     }
// }
// const btnErrorHandler = (message, type) => {
//     const registerBtn = document.getElementById('regsiter-btn');
//     const currentText = registerBtn.textContent;
//     registerBtn.disabled = true;
//     registerBtn.textContent = message;
//     registerBtn.style.color = type === 'error' ? 'red' : 'green';
//     setTimeout(() => {
//         registerBtn.disabled = false;
//         registerBtn.textContent = currentText;
//         registerBtn.style.color = 'black';
//     }, 2000);
// }
// // controller communication (mvc)
// const sendToServerController = async (emailInput, password, language, languageData) => {
//     const payload = {email: emailInput.current.value, password};
//     const controllerRequest = await fetch('http://localhost:8080/api/register', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//     })
//     // check server for validation errors as well
//     if (controllerRequest.ok) {
//         const controllerResponse = await controllerRequest.json();
//         if (controllerResponse === 'Invalid Email') return uiEmailErrorHandler(languageData.errors.emailInvalid[language], emailInput, 'Invalid Email');
//         if (controllerResponse.state === false) return passwordAnimationHandler(controllerResponse.id);
//         // handle error and success case
//         if (controllerResponse === 'Invalid') return btnErrorHandler(languageData.errors.alreadyRegistered[language], 'error');
//         // success here
//         btnErrorHandler(languageData.success.accountCreated[language], 'success');
//         sharedRegister(true);
//     } else {
//         // todo: handle server error
//     }
// }