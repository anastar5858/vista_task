let animationIndicator = null;
const Home = (props) => {
    // alternate between register and login views
    const [register, setRegister] = React.useState(true);
    const links = document.querySelectorAll('a');
    links.forEach((link) => link.addEventListener('click', (e) => {
        e.currentTarget.textContent === 'Register' ? setRegister(true) : setRegister(false)
    }));
    React.useEffect(() => {
        animationIndicator = !animationIndicator
    }, [register]);
    return (
        <>
            {register && <Register animationIndicator={animationIndicator}/>}
            {!register && <Login animationIndicator={animationIndicator} />}
        </>
    )
}