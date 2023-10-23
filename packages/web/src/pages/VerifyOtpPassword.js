/** @jsxImportSource theme-ui */
import { verifiedForgotPasswordOtp } from "@tb-frontend/shared/Store/action/authActions";
import { Formik } from "formik";
import Cookies from "js-cookie";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, Container, Flex, Input, Spinner, Text } from "theme-ui";
import * as Yup from "yup";
import AlertModal from "../components/Modals/AlertModal";
import TitleTag from "../components/TitleTag";
const VerifyOtpPassword = (props) => {
  const appTranslations = useSelector((state) => state?.app?.appTranslations);
  const location = useLocation();
  const history = useHistory();
  const user = queryString?.parse(location?.search);
  const dispatch = useDispatch();
  const [model, setModal] = useState(false);
  const [noCancle, setNoCancle] = useState(false);
  const [noOk, setNoOk] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState("");
  const ChangePasswordSchema = Yup.object().shape({
    otp: Yup.string().required(appTranslations.REQUIRED),
    new_password: Yup.string()
      .required(appTranslations.REQUIRED)
      .min(6, appTranslations.VALIDATION_PASSWORD)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        appTranslations.VALIDATION_PASSWORD_MATCH
      ),
    confirm_password: Yup.string()
      .required(appTranslations.REQUIRED)
      .oneOf(
        [Yup.ref("new_password"), null],
        appTranslations.VALIDATION_CONFIRM_PASSWORD
      ),
  });
  useEffect(() => {
    if (Cookies.get("uid") == user?.uuid) {
    } else {
      history.push("/");
    }
  }, []);
  return (
    <>
      <TitleTag title={"Verify Otp"} />
      <section sx={{ variant: "layout.Section" }}>
        <Container>
          <Flex
            sx={{
              justifyContent: "center",
            }}
          >
            <Box bg="LightBlue" p={4} variant="Card">
              <div>
                <Text
                  sx={{
                    fontSize: [4, 5],
                    fontFamily: "body",
                    fontWeight: 500,
                    color: "Blue_Theme",
                  }}
                >
                  Verify Otp Password
                </Text>
              </div>
              <div
                sx={{
                  textAlign: "center",
                  paddingTop: 2,
                  marginBottom: 3,
                }}
              >
                <Text
                  sx={{
                    fontSize: 1,
                    fontFamily: "body",
                    color: "colorDark3",
                  }}
                >
                  {appTranslations?.VERIFICATION_OTP_MESSAGE_ONE}{" "}
                  <strong>
                    {user?.number
                      ?.substr(0, 6)
                      ?.replace(new RegExp("[0-9]", "g"), "X")}
                    {user?.number?.substr(6)}
                  </strong>{" "}
                  {appTranslations?.VERIFICATION_OTP_MESSAGE_TWO}
                </Text>
              </div>

              <Formik
                initialValues={{
                  otp: "",
                  new_password: "",
                  confirm_password: "",
                  temp_token: user?.uuid,
                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values, actions) => {
                  console.log("onSubmit", values);
                  const Callback = (response) => {
                    console.log("VerifyOtpPassword Callback", response);
                    if (response?.code == 200) {
                      setTitle("Success");
                      setMessage(response?.data);
                      setNoCancle(true);
                      setNoOk(false);
                      setModal(true);
                      setRedirect("/");
                      Cookies.remove("uid");
                    } else {
                      setTitle("Error");
                      setMessage(response?.data);
                      setNoCancle(false);
                      setNoOk(false);
                      setModal(true);
                      setRedirect("");
                    }
                    actions.setSubmitting(false);
                  };
                  dispatch(verifiedForgotPasswordOtp(values, Callback));
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  handleBlur,
                  isSubmitting,
                  /* and other goodies */
                }) => {
                  return (
                    <>
                      <div sx={{ position: "relative", marginBottom: 4 }}>
                        <img
                          src={"../images/lock.svg"}
                          alt="lock"
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: "15px",
                          }}
                        />
                        <Input
                          placeholder={appTranslations?.PLACEHOLDER_OTP}
                          autoFocus={true}
                          sx={{
                            marginBottom: 0,
                          }}
                          // type="number"
                          inputMode="numeric"
                          name="otp"
                          onChange={handleChange("otp")}
                          onBlur={handleBlur("otp")}
                          value={values.otp}
                        />
                        <span className="text-danger">
                          {errors.otp && touched.otp && errors.otp}
                        </span>
                      </div>
                      <div sx={{ position: "relative", marginBottom: 4 }}>
                        <img
                          src={"../images/lock.svg"}
                          alt="lock"
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: "15px",
                          }}
                        />
                        <Input
                          placeholder={
                            appTranslations?.PLACEHOLDER_NEW_PASSWORD
                          }
                          sx={{
                            marginBottom: 0,
                          }}
                          type="password"
                          inputMode="numeric"
                          name="new_password"
                          onChange={handleChange("new_password")}
                          onBlur={handleBlur("new_password")}
                          value={values.new_password}
                        />
                        <span className="text-danger">
                          {errors.new_password &&
                            touched.new_password &&
                            errors.new_password}
                        </span>
                      </div>
                      <div sx={{ position: "relative", marginBottom: 4 }}>
                        <img
                          src={"../images/lock.svg"}
                          alt="lock"
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: "15px",
                          }}
                        />
                        <Input
                          placeholder={
                            appTranslations?.PLACEHOLDER_CONFIRM_PASSWORD
                          }
                          sx={{
                            marginBottom: 0,
                          }}
                          type="password"
                          inputMode="numeric"
                          name="confirm_password"
                          onKeyPress={(e) => {
                            if (e.code === "Enter") {
                              handleSubmit();
                            }
                          }}
                          onChange={handleChange("confirm_password")}
                          onBlur={handleBlur("confirm_password")}
                          value={values.confirm_password}
                        />
                        <span className="text-danger">
                          {errors.confirm_password &&
                            touched.confirm_password &&
                            errors.confirm_password}
                        </span>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <Button py={10} onClick={handleSubmit}>
                            {isSubmitting ? (
                              <Spinner size={20} sx={{ color: "#fff" }} />
                            ) : (
                              appTranslations.ACCOUNT_CHANGE_PASSWORD
                            )}
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                }}
              </Formik>
            </Box>
            <AlertModal
              isOpen={model}
              Title={title}
              message={message}
              noCancle={noCancle}
              noOK={noOk}
              closeModal={() => {
                setModal(false);
                setMessage("");
                setTitle("");
              }}
              onCancle={() => {
                setModal(false);
                setMessage("");
                setTitle("");
              }}
              onOk={() => {
                setModal(false);
                setMessage("");
                setTitle("");
                if (redirect !== "") {
                  setRedirect("");
                  history.push("/");
                }
              }}
            />
          </Flex>
        </Container>
      </section>
    </>
  );
};
export default VerifyOtpPassword;
