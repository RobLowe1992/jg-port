import React, { Component } from 'react';
import '../../scss/Header.css';

class Header extends Component {
    render(){
        return (
            <header className="row">
                <div className="navigation">
                    <ul>
                        <li><a className="nav-links" href="">About</a></li>
                        <li><a className="nav-links" href="">Projects</a></li>
                        <li><a className="nav-links" href="">Blog</a></li>
                        <li><a className="nav-links" href="">Contact</a></li>
                    </ul>
                </div>
                {/*<div className="social-icons">*/}
                    {/*<ul>*/}
                        {/*<li><a className="nav-links" href="#facebook"><img src="../../images/facebook.svg" alt="Facebook"/></a></li>*/}
                        {/*<li><a className="nav-links" href="#twitter"><img src="../../images/twitter.svg" alt="Twiiter"/></a></li>*/}
                        {/*<li><a className="nav-links" href="#linkedin"><img src="../../images/linkedin.svg" alt="LinkedIn"/></a></li>*/}
                    {/*</ul>*/}
                {/*</div>*/}
            </header>
        )
    }
}

export default Header;

