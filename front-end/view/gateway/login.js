const Login = (props) => {
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const statusMark = React.useRef(null);
    return (
        <form className='flex-column surface'>
        <input ref={emailRef} className='w-30 middle front' type='email' placeholder='Email' />
        <input ref={passwordRef} className='w-30 middle front' type='password' placeholder='Password' />
        <mark ref={statusMark} style={{textAlign: 'center'}} className='front w-center'><strong>IDLE</strong></mark>
        <button onClick={(e) => {
            e.preventDefault();
            loginForwarder(emailRef, passwordRef, statusMark);
        }} onMouseEnter={(e) => e.currentTarget.style.animation = 'none'} 
        className='w-10 middle front primary-container'  
        style={{animation: `${props.animationIndicator === true ? 'btnTransition 3s 1 forwards' : 'default'}`}}>Login</button>
    </form>
    )
}