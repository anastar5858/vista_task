const Register = (props) => {
    return  (
    <form className='flex-column surface'>
        <input className='w-30 middle front' type='email' placeholder='Email' />
        <input className='w-30 middle front' type='text' placeholder='Password' />
        <button className='w-10 middle front'>Register</button>
    </form>
    )
}