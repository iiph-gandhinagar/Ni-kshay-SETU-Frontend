import React, { Component } from 'react';
import { Link } from 'theme-ui';
export class PublicNavbar extends Component {
    render() {
        return (
            <header id="header">
                <div id="navbar" className="artflex-nav bg-transparent shadow-none">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link href="/" className="navbar-brand">
                                <img style={{ }} src="../../../images/Logo.svg" alt="logo" />
                                {/* <img style={{ height: 'auto', width: 200 }} src="../../../navbar-logo.svg" alt="name" /> */}
                            </Link>


                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default PublicNavbar
