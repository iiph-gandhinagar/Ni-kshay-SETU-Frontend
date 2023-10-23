/** @jsxImportSource theme-ui */
import {
    getAllSimilarApps, getAppConfig, getAppDynamicAlgo, getFlashNews, getRecentlyAdded, getTopModule, setAppLang
} from '@tb-frontend/shared/Store/action/appActions';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Heading } from 'theme-ui';
import LangComponent from '../components/LangComponent';
import TitleTag from '../components/TitleTag';

const ApplicationLanguage = (props) => {
    const dispatch = useDispatch();
    const { appLanggusges, appLang, loader } = useSelector(state => state?.app);
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <>
            <TitleTag title={appTranslations.HEADER_APP_LANG} />
            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 38 }}>{appTranslations.HEADER_APP_LANG}</Heading>
                    <Grid gap={3} columns={[2, null, 3, 4, 5]}>
                        {appLanggusges?.map((item, i) => {
                            return (
                                <LangComponent
                                    title={item?.title}
                                    subTitle={item?.sub_title}
                                    onClick={async () => {
                                        await dispatch(setAppLang(item.code));
                                        await Cookies.set('appLang', item.code);
                                        dispatch(getAppConfig());
                                        dispatch(getFlashNews());
                                        dispatch(getAllSimilarApps());
                                        dispatch(getAppDynamicAlgo());
                                        dispatch(getTopModule());
                                        dispatch(getRecentlyAdded());
                                    }}
                                    isSelected={item.code == appLang}
                                    source={item.img_url || "images/Langauage/Translate.png"} key={i} />
                            );
                        })}
                    </Grid>
                </Container>
            </section>
        </>
    );
}
export default ApplicationLanguage;