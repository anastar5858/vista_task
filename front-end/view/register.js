const Register = (props) => {
    console.log(props.animationIndicator, props.animationIndicator === true)
    return  (
    <form className='flex-column surface'>
        <input className='w-30 middle front' type='email' placeholder='Email' />
        <input className='w-30 middle front' type='text' placeholder='Password' />
        <button onMouseEnter={(e) => e.currentTarget.style.animation = 'none'} className='w-10 middle front primary-container' style={{animation: `${props.animationIndicator === false ? 'btnTransition 3s 1 forwards' : 'default'}`}}>Register</button>
    </form>
    )
}