const React = require('react');
const languageObj = require('../raw/language.json');

const Login = (props) => {
    const language = props.language
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const statusMark = React.useRef(null);
    const [languageData, setLanguageData] = React.useState({});
    React.useEffect(() => {
        setLanguageData(languageObj)
    }, []);
    return (
        <form className='flex-column surface'>
        <input data-testid='email-input' id='email-input' ref={emailRef} className='w-30 middle front media-wide' type='email' placeholder={Object.keys(languageData).length > 0 ? languageData.login.emailPlaceholder[language] : ''} />
        <input data-testid='password-login' id='password-login' ref={passwordRef} className='w-30 middle front media-wide' type='password' placeholder={Object.keys(languageData).length > 0 ? languageData.login.passwordPlaceholder[language] : ''} />
        <mark data-testid='login-status' id='login-status' ref={statusMark} style={{textAlign: 'center'}} className='front w-center'><strong>IDLE</strong></mark>
        <button data-testid='login-btn' id='login-btn' onAnimationStart={() => {
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
        }} onClick={(e) => {
            e.preventDefault();
            loginForwarder(emailRef, passwordRef, statusMark, language, languageData);
        }} onMouseEnter={(e) => e.currentTarget.style.animation = 'none'} 
        className='w-10 middle front primary-container'  
        style={{animation: `${props.animationIndicator === true ? 'btnTransition 3s 1 forwards' : 'default'}`}}>{Object.keys(languageData).length > 0 ? languageData.login.loginBtn[language] : ''}</button>
    </form>
    )
}

const loginForwarder = async (emailInput, passwordInput, markErrElem, language, languageData) => {
    const payload = {
        email: emailInput.current.value,
        password: passwordInput.current.value,
    }
    const loginRequest = await fetch('http://localhost:8080/api/login', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (loginRequest.ok) {
        const loginResponse = await loginRequest.json();
        if (loginResponse === 'invalid') markErrElem.current.firstChild.textContent = languageData.errors.invalidCredentials[language];
        else markErrElem.current.firstChild.textContent = 'success';
    } else {
        // todo: handle server error
    }
}

module.exports = {
    Login,
}