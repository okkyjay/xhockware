import React from 'react'
import Logo from '../assets/images/logo.jpg'
function Header() {
    return(
        <header id="header">
            <div id="header-content">
                <a id="header-logo">
                    <img src={Logo}/>
                </a>
            </div>
        </header>
    )
}
export default Header
