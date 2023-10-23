/** @jsxImportSource theme-ui */
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import {
  storeUserActivity
} from '@tb-frontend/shared/Store/action/appActions';
import { setUserToken } from '@tb-frontend/shared/Store/action/authActions';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Box, Container, Flex, Heading, Text } from 'theme-ui';
import AccountListItem from '../../components/Account/AccountListItem';
import { mixpanel } from '../../MainApp';
import TitleTag from '../../components/TitleTag';

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const userDetails = useSelector(state => state?.user?.userData);
  const media = userDetails?.[0]?.media?.[0];
  const { appTranslations } = useSelector((state) => state?.app);
  return (
    <>
      <TitleTag title="Account" />
      <section sx={{ variant: 'layout.Home' }}>
        <Container sx={{ mt: 50 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <Heading variant="Nunito11" sx={{ color: "Grey_3" }} className="">{appTranslations.HEADER_PERSONAL_DETAILS}</Heading>
              <hr sx={{ variant: "ProfileHr" }} />
              <div className="mx-lg-4 mx-0">
                <AccountListItem title={'Edit Personal Details'} onClick={() => history.push("/EditProfileDetails")} />
                <AccountListItem title={"Change Password"} onClick={() => history.push("/ChangePassword")}/>
                <AccountListItem title={"Edit Profile Picture"} onClick={() => history.push("/EditProfilePicture")} />
              </div>
              <Heading variant="Nunito11" sx={{ color: "Grey_3" }} className="mt-2">Support</Heading>
              <hr sx={{ variant: "ProfileHr" }} />
              <div className="mx-lg-4 mx-0">
                <AccountListItem title={"Change Application Language"} onClick={() => history.push("/ApplicationLanguage")} />
                <AccountListItem title={"Contect Us"} onClick={() => history.push("/ContactUs")} />
                <AccountListItem title={"Partners and Developers"} onClick={() => history.push("/PartnersAndDevelopers")} />
                <AccountListItem title={"About Us"} onClick={() => history.push("/AboutCGCProject")} />
                <AccountListItem title={"Share Application Link"} />
                <AccountListItem title={"Sign Out"} onClick={async () => {
                  mixpanel.track('user_Logout');
                  await dispatch(storeUserActivity('user_Logout'));
                  await Cookies.set('token', '')
                  await dispatch(setUserToken(null));
                  window.location?.reload();
                }} />
              </div>
            </div>
            <div className="col-lg-5">
              <Box className="personal-details text-center text-white mx-auto" variant="PersonalDetails">
                {media ?
                  <img src={media?.origin?.original_url}
                    alt="ProfilePic"
                    sx={{ width: 200, borderRadius: 2000 }}
                    className="mx-auto mt-4 mb-3" />
                  :
                  <img
                    src="../../../images/ProfilePic.png"
                    alt="ProfilePic"
                    style={{ backgroundColor: '#FFF' }}
                    sx={{ width: 200, borderRadius: 2000 }}
                    className="mx-auto mt-4 mb-3" />
                }
                <Flex className="align-items-center mb-3">
                  <Box sx={{ width: 138 }} className="col-auto">
                    <Flex className="justify-content-between align-items-center">
                      <Heading variant="Raleway18" sx={{ color: "YELLOW" }}>{appTranslations.TABLE_NAME}</Heading>
                      <Heading variant="Raleway18" sx={{}}>:</Heading>

                    </Flex>
                  </Box>
                  <Box sx={{}} className="ms-1 text-start">
                    <Heading variant="Nunito18title" sx={{}}>{userDetails?.[0]?.name}</Heading>
                  </Box>
                </Flex>
                <Flex className="align-items-center mb-3 pt-1">
                  <Box sx={{ width: 138 }} className="col-auto">
                    <Flex className="justify-content-between align-items-center">
                      <Heading variant="Raleway18" sx={{ color: "YELLOW" }}>{appTranslations.CADRE_LEVEL}</Heading>
                      <Heading variant="Raleway18" sx={{}}>:</Heading>

                    </Flex>
                  </Box>
                  <Box sx={{}} className="ms-1 text-start">
                    <Heading variant="Nunito18title" sx={{}}>{userDetails?.[0]?.cadre_title}</Heading>
                  </Box>
                </Flex>
                <Flex className="align-items-center mb-3 pt-1">
                  <Box sx={{ width: 138 }} className="col-auto">
                    <Flex className="justify-content-between align-items-center">
                      <Heading variant="Raleway18" sx={{ color: "YELLOW" }}>{appTranslations.HEADER_STATE}</Heading>
                      <Heading variant="Raleway18" sx={{}}>:</Heading>

                    </Flex>
                  </Box>
                  <Box sx={{}} className="ms-1 text-start">
                    <Heading variant="Nunito18title" sx={{}}>{userDetails?.[0]?.state_title || userDetails?.[0]?.country_title}</Heading>
                  </Box>
                </Flex>
                <Flex className="align-items-center pt-1">
                  <Box sx={{ width: 138 }} className="col-auto">
                    <Flex className="justify-content-between align-items-center">
                      <Heading variant="Raleway18" sx={{ color: "YELLOW" }}>{appTranslations.PLACEHOLDER_MOBILE_NUMBER}</Heading>
                      <Heading variant="Raleway18" sx={{}}>:</Heading>

                    </Flex>
                  </Box>
                  <Box sx={{}} className="ms-1 text-start">
                    <Heading variant="Nunito18title" sx={{}}>{userDetails?.[0]?.phone_no}</Heading>
                  </Box>
                </Flex>
              </Box>
              <Box sx={{}} className="text-center">
                <Heading variant="Nunito18title" sx={{ color: "HOVER_ORANGE" }}>Powered by Digiflux IT Solutions <Text sx={{ color: "Grey_1" }} className="ms-1 text-start">V 3.8.0</Text></Heading>
              </Box>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
export default Account;