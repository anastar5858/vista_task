let sharedRegister;
let dashboardView;
const Navbar = (props) => {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const urlParamater = new URLSearchParams(window.location.search);
    const lan = urlParamater.get('lan')
    // todo: check the user session by calling the controller to check the sign in state using the api /verify route
    const [registered, setregistered] = React.useState(props.loggedIn ? true : false);
    const [verify, setVerify] = React.useState(props.loggedIn ? true : false);
    const [language, setLanguage] = React.useState(lan ? lan : 'en');
    // for hamburger menu displau
    const [hamburgerDisplay, setHamburgerDisplay] = React.useState(windowWidth < 630 ? true : false);
    React.useEffect(() => {
      sharedRegister = setregistered;
    } , []);
    React.useEffect(() => {
      if (registered && !props.loggedIn) {
        verifyToken(setVerify);
        window.location.replace(`http://localhost:5500/assets/html/protected.html?lan=${language}`);
      } else if (props.loggedIn) {
        verifyToken(setVerify);
      }
    }, [registered]);
    React.useEffect(() => {
      // registeration and log in update on navbar language change
      if (sharedLan !== undefined) {
        if (typeof sharedLan === 'function') {
          sharedLan(language);
        }
      }
      if (sharedLanFooter !== undefined) {
        if (typeof sharedLanFooter === 'function') {
          sharedLanFooter(language);
        }
      }  
    } , [language])
    return (
      <div className='flex-row primary'>
        <picture>
         <img width='50px' height='20px' src={props.loggedIn ? '../images/RMSLogo.svg' : 'assets/images/RMSLogo.svg'}/>
         <figcaption>
          <i>Request Management System Challenge</i>
         </figcaption>
        </picture>
        {/* hamburger menu */}
        {hamburgerDisplay && (
        <div className="menudiv">
          <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label> 
          <input type="checkbox" id="menu-toggle" className="checkbox-input" />
          <input type="checkbox" id="menu-toggle2" className="checkbox-input" />
          <label htmlFor="menu-toggle2" className="menu-icon">&#9776;</label>
          <menu id="the-menu" className="the-menu">
          {verify && (
              <> 
              <li>
                <button onClick={() => {
                  logOut(setVerify, language);
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
          <details id='change-language-mode' className='flex-column'>
            <summary>Langueg:</summary>
            <label htmlFor='ar'>عربي</label>
            <input onClick={() => setLanguage('ar')} type='radio' id='ar' name='lan'></input>
            <label htmlFor='en'>English</label>
            <input onClick={() => setLanguage('en')} type='radio' id='en' name='lan'></input>
        </details>
          </menu>
        </div> 
        )}
        {/* desktop view */}
        {!hamburgerDisplay && (
        <ul className='flex-row'>
        {verify && (
          <> 
          <li>
            <button onClick={() => {
                logOut(setVerify, language);
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
        <details id='change-language-mode' className='flex-column'>
            <summary>Langueg:</summary>
            <label htmlFor='ar'>عربي</label>
            <input onClick={() => setLanguage('ar')} type='radio' id='ar' name='lan'></input>
            <label htmlFor='en'>English</label>
            <input onClick={() => setLanguage('en')} type='radio' id='en' name='lan'></input>
        </details>
        </ul>
        )}
      </div>
    );
  }