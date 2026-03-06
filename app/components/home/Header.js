export default function Header() {
  return (
    <header>
      <div className="nav__container">
        <div className="nav__mobile">
          <div className="nav__logo">
            <a href="#">
              <img
                src="/frontend_assets/img/logo.png"
                alt="working space – SpringHouse coworking office view"
              />
            </a>
          </div>
          <div className="nav__btn">
            <a aria-label="Mobile menu" className="nav-toggle">
              <span></span>
              <span className="mrg"></span>
              <span className="mrg"></span>
            </a>
          </div>
        </div>
        <nav className="menu-toggle">
          <ul className="nav__menu">
            <li>
              <a href="#">About us</a>
            </li>
            <li className="dropdown">
              <a href="#">Locations</a>
              <ul>
                <li>
                  <a href="#">Gurugram</a>
                </li>
              </ul>
            </li>
            <li className="dropdown drop1">
              <a className="arrow1" href="#">
                Solutions
              </a>
              <a
                className="nav-link dropdown-toggle dropdown-toggle-split"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></a>
              <ul className="">
                <li>
                  <a href="#">Managed Office</a>
                </li>
                <li>
                  <a href="#">Virtual Office</a>
                </li>
                <li>
                  <a href="#">Coworking</a>
                </li>
                <li>
                  <a href="#">Day Pass</a>
                </li>
                <li>
                  <a href="#">Meeting Rooms</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="managed-office">
                Managed Office
              </a>
            </li>
          </ul>
        </nav>
        <div className="navbar-btn-box">
          <a
            href="javascript:void(0)"
            className="themebtn themebtn1 membership-login"
          >
            Membership Login
          </a>
          <a
            href="#exampleModaltwo"
            data-bs-toggle="modal"
            data-bs-target="#exampleModaltwo"
            className="themebtn themebtn2 lets-talk"
          >
            Let's Talk!
          </a>
        </div>
      </div>
    </header>
  );
}
