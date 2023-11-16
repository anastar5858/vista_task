const Home = (props) => {
    // alternate between register and login views
    const [register, setRegister] = React.useState(true);
    const links = document.querySelectorAll('a');
    links.forEach((link) => link.addEventListener('click', (e) => e.currentTarget.textContent === 'Register' ? setRegister(true) : setRegister(false)));
    return (
        <>
            {register && <Register />}
            {!register && <Login />}
        </>
    )
}