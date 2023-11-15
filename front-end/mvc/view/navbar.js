const Navbar = (props) => {
    // todo: check the user session by calling the controller to check the sign in state using the api /verify route
    const registered = true;
    return (
      <div className='flex-row primary'>
        <img src='images/RMSLogo.png'/>
        <ul className='flex-row'>
          {registered && (
            <> 
            <li><button className='primary-container'>Logout</button></li>
            <li><a>New Request</a></li>
            <li><a>Manage Requests</a></li>
            </>
          )}
          {!registered && (
            <> 
            <li><a>Register</a></li>
            <li><a>Log in</a></li>
            </>
          )}
        </ul>
      </div>
    );
  }