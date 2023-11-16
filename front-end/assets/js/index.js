  const navbar = <Navbar/>;
  const home = <Home />;
  ReactDOM.render(navbar, document.getElementById('navabar'));
  ReactDOM.render(home, document.getElementById('mainhome'));
  // events for navbar links underlines
  const links = document.querySelectorAll('a');
  links.forEach((link) => link.addEventListener('click', (e) => displayUnderline(e)));
  const displayUnderline = (e) => {
    const prevUnderlines = [...document.getElementsByClassName('underline')];
    if (prevUnderlines.length > 0) prevUnderlines.forEach((prevUnderline) => prevUnderline.remove());
    const underline = document.createElement('hr')
    underline.style.width = `${e.currentTarget.textContent.length}ch`;
    underline.classList.add('underline')    
    // console.log(e.currentTarget.appendChild, clone)
    e.currentTarget.appendChild(underline);
  }
