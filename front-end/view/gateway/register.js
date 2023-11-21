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
        <ul className='middle front bullet'>
            <strong>Password Compliance Rules</strong>
            <li>
                <mark id='pass-val-long'><strong>{Object.keys(languageData).length > 0 ? languageData.register.passwordRule1[language] : ''}</strong></mark>
                <input type='checkbox' disabled checked={passwordValidator.long ? true : false}></input>
            </li>
            <li>
                <mark id='pass-val-limit'><strong>{Object.keys(languageData).length > 0 ? languageData.register.passwordRule2[language] : ''}</strong></mark>
                <input type='checkbox' disabled checked={passwordValidator.chacractersLimit ? true : false}></input>
            </li>
            <li>
                <mark id='pass-val-sten'> <strong>{Object.keys(languageData).length > 0 ? languageData.register.passwordRule3[language] : ''}</strong></mark>
                <input type='checkbox' disabled checked={passwordValidator.startEndNo ? true : false}></input>
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
        }} onClick={(e) => registerRequestForwarder(emailRef, passwordRef, e, passwordValidator)}
        onMouseEnter={(e) => e.currentTarget.style.animation = 'none'} 
        className='w-10 middle front primary-container' 
        style={{animation: `${props.animationIndicator === false ? 'btnTransition 3s 1 forwards' : 'default'}`}}>{Object.keys(languageData).length > 0 ? languageData.register.registerBtn[language] : ''}</button>
    </form>
    )
}
const registerRequestForwarder = (emailRef, passwordRef, event, passwordValidator) => {
    event.preventDefault();
    // forward to client-side controller
    validateEmail(emailRef, passwordRef, passwordValidator);
}