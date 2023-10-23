import {
  getAllSimilarApps,
  getAppConfig,
  getAppDynamicAlgo,
  getAppHelthStatus, getFlashNews, getRecentlyAdded, getTopModule, setAppLang
} from '@tb-frontend/shared/Store/action/appActions';
import { setUserToken } from '@tb-frontend/shared/Store/action/authActions';
import { getRootFolders } from '@tb-frontend/shared/Store/action/materialsAction';
import { getUserData } from '@tb-frontend/shared/Store/action/usersActions';
import { ThemeProvider } from '@theme-ui/core';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Chat from '../../pages/Chat';
import theme from '../../theme';
// import Maintenance from '../Modals/UnderMaintenance';
import Navbar from './Navbar';
import PublicNavbar from './PublicNavBar';
export default function Layout({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const appLang = Cookies.get('appLang') || 'en';
  useEffect(() => {
    dispatch(getAppConfig());
    dispatch(setAppLang(appLang));
    dispatch(getAppHelthStatus(''));
  }, [])
  const token = Cookies.get('token')
  const publicScreen = (token == undefined || token == null || token == '' || location.pathname === "/Login" || location.pathname === '/VerifyOtpPassword' ||
    location.pathname === "/Sign-up" || location.pathname === "/VerifyMobileNumber" ||
    location.pathname === "/ForgotPassword");
  useEffect(() => {
    if (token !== null && token !== '' && token) {
      dispatch(getUserData());
      dispatch(getRootFolders());
      dispatch(setUserToken(token))
      dispatch(getAppDynamicAlgo());
      dispatch(getAllSimilarApps());
      dispatch(getFlashNews());
      dispatch(getRecentlyAdded());
      dispatch(getTopModule());
    }
  }, [token])
  return (
    <ThemeProvider theme={theme}>
      {publicScreen ? <PublicNavbar /> : <Navbar />}
      {/* <Maintenance /> */}
      {children}
      {publicScreen ? "" : <Chat />}
    </ThemeProvider>
  );
}
