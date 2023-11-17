const Register = (props) => {
    const [password, setPassword] = React.useState('');
    const [passwordValidator, setPasswordValidator] = React.useState({long: false, chacractersLimit: false, startEndNo: false});
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    // live validation of password here
    React.useEffect(() => {
        validatePassword(password, setPasswordValidator);
    }, [password]);
    return  (
    <form className='flex-column surface'>
        <input ref={emailRef} className='w-30 middle front' type='email' placeholder='Email' />
        <input ref={passwordRef} onInput={(e) => setPassword(e.currentTarget.value)} className='w-30 middle front' type='password' placeholder='Password' />
        <ul className='middle front bullet'>
            <li>
                <mark id='pass-val-long'>Longer then 8 characters</mark>
                <input type='checkbox' disabled checked={passwordValidator.long ? true : false}></input>
            </li>
            <li>
                <mark id='pass-val-limit'>At least 1 capital letter, 1 number, 1 symbol</mark>
                <input type='checkbox' disabled checked={passwordValidator.chacractersLimit ? true : false}></input>
            </li>
            <li>
                <mark id='pass-val-sten'> Not starting or ending with a number</mark>
                <input type='checkbox' disabled checked={passwordValidator.startEndNo ? true : false}></input>
            </li>
        </ul>
        <button onClick={(e) => registerRequestForwarder(emailRef, passwordRef, e, passwordValidator)}
        onMouseEnter={(e) => e.currentTarget.style.animation = 'none'} 
        className='w-10 middle front primary-container' 
        style={{animation: `${props.animationIndicator === false ? 'btnTransition 3s 1 forwards' : 'default'}`}}>Register</button>
    </form>
    )
}
const registerRequestForwarder = (emailRef, passwordRef, event, passwordValidator) => {
    event.preventDefault();
    // forward to client-side controller
    validateEmail(emailRef, passwordRef, passwordValidator);
}