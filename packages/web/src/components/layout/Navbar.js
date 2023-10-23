import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserToken } from '@tb-frontend/shared/Store/action/authActions';
import {
    storeUserActivity,
} from '@tb-frontend/shared/Store/action/appActions';
// import AppLangModal from '../Modals/LangModal';
import { Link } from 'theme-ui';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { mixpanel } from '../../MainApp';
export class Navbar extends Component {
    _isMounted = false;

    state = {
        drawer: false,
        searchForm: false,
        collapsed: true,
    };

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleSearchForm = () => {
        this.setState(prevState => {
            return {
                searchForm: !prevState.searchForm
            };
        });
    }

    handleDrawer = () => {
        this.setState(prevState => {
            return {
                drawer: !prevState.drawer
            };
        });
    }

    componentDidMount() {
        this._isMounted = true;
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const { pathname } = this.props.location;
        const { collapsed } = this.state;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        const { userData, appTranslations } = this.props
        return (
            <header id="header">
                <div id="navbar" className={`artflex-nav`}>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link href="/" className="navbar-brand">
                                <img style={{}} src="../../../images/Logo.svg" alt="logo" />
                                {/* <img style={{ height: 'auto', width: 200 }} src="../../../navbar-logo.svg" alt="name" /> */}
                            </Link>

                            <button
                                onClick={this.toggleNavbar}
                                className={classTwo}
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className={classOne} id="navbarSupportedContent">
                                <ul className="navbar-nav mx-auto">
                                    <li className="nav-item">
                                        <Link href="/" className={`nav-link text-decoration-none ${pathname === '/' ? 'active' : ''}`}>
                                            {appTranslations?.TAB_HOME}
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/Assessment?tab=performance" className={`nav-link text-decoration-none ${pathname === "/Assessment" ? 'active' : ''}`}>
                                            {appTranslations.TAB_ASSESS}
                                        </Link>

                                    </li>

                                    <li className="nav-item">
                                        <Link href="/Leaderboard?tab=Leaderboard" className={`nav-link text-decoration-none ${pathname === "/Leaderboard" ? 'active' : ''}`}>
                                            {appTranslations.TAB_NAME_LEADERBOARD}
                                        </Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link href="/Account" className={`nav-link text-decoration-none ${pathname === "/Account" ? 'active' : ''}`}>
                                            {appTranslations.TAB_ACCOUNT}
                                        </Link>
                                    </li>
                                </ul>

                                <div className="others-option">
                                    <ul className="navbar-nav mx-auto">
                                        <li className="nav-item">
                                            <Link href="/MasterSearch" className="mx-0">
                                                <img style={{ width: 45 }} src={pathname === "/MasterSearch" ? "../../../images/SearchActive.png" : "../../../images/Search.svg"} alt="Search" />
                                            </Link>
                                            <Link href="/ApplicationLanguage" className="mx-0">
                                                <img style={{}} src={pathname === "/ApplicationLanguage" ? "../../../images/LanguageActive.svg" : "../../../images/Language.svg"} alt="Language" className="px-xl-4 px-2" />
                                            </Link>
                                            {/* <img style={{}} src="../../../images/Notification.svg" alt="Notification" /> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}


const mapStateToProps = ({ user, app }) => {
    const { userData } = user;
    const { appTranslations } = app;
    return {
        userData,
        appTranslations
    };
};
export default withRouter(connect(mapStateToProps, { storeUserActivity, setUserToken })(Navbar));
