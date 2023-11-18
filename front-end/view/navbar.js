let sharedRegister;
let dashboardView;
const Navbar = (props) => {
    // todo: check the user session by calling the controller to check the sign in state using the api /verify route
    const [registered, setregistered] = React.useState(props.loggedIn ? true : false);
    const [verify, setVerify] = React.useState(props.loggedIn ? true : false);
    React.useEffect(() => {
      sharedRegister = setregistered;
    } , []);
    React.useEffect(() => {
      if (registered && !props.loggedIn) {
        verifyToken(setVerify);
        window.location.replace("http://localhost:5500/assets/html/protected.html");
      } else if (props.loggedIn) {
        verifyToken(setVerify);
      }
    }, [registered]);
    return (
      <div className='flex-row primary'>
        <picture>
         <img width='50px' height='20px' src={props.loggedIn ? '../images/RMSLogo.svg' : 'assets/images/RMSLogo.svg'}/>
         <figcaption>
          <i>Request Management System Challenge</i>
         </figcaption>
        </picture>
        <ul className='flex-row'>
          {verify && (
            <> 
            <li>
              <button onClick={() => {
                logOut(setVerify);
              }} className='primary-container'>Logout</button>
            </li>
            <li>
              <a onClick={() => sharedRouter('create')}>New Request</a>
            </li>
            <li>
              <a onClick={() => sharedRouter('manage')}>Manage Requests</a>
            </li>
            </>
          )}
          {!verify && (
            <> 
            <li>
              <a>Register</a>
            </li>
            <li>
              <a>Log in</a>
            </li>
            </>
          )}
        </ul>
      </div>
    );
  }