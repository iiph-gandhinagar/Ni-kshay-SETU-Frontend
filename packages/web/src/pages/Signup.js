/** @jsxImportSource theme-ui */
import { registerUser } from "@tb-frontend/shared/Store/action/authActions";
import {
  clearBlock,
  clearCadre,
  clearDistrict,
  clearHelth,
  getAllCadre,
  getAllCadreType,
  getAllState,
  getBlockByDistrict,
  getDistrictByState,
  getHealthByBlock,
} from "@tb-frontend/shared/Store/action/usersActions";
import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Text,
} from "theme-ui";
import * as Yup from "yup";
import CustomModal from "../components/Modals/CustomModal";
import TitleTag from "../components/TitleTag";

const Signup = (props) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("props", props);
  const state = useSelector((state) => state?.user?.State);
  const district = useSelector((state) => state?.user?.allDistricts);
  const block = useSelector((state) => state?.user?.allBlocks);
  const cadre = useSelector((state) => state?.user?.allCadres);
  const cadreType = useSelector((state) => state?.user?.allCadresType);
  const health = useSelector((state) => state?.user?.allHealths);
  const appTranslations = useSelector((state) => state?.app?.appTranslations);
  var editor = "";
  const [model, setModal] = useState(false);
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg: "../../images/Ellipse.png",
  });

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
    });
  };

  const handleSave = (e) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImage();
      const croppedImg = canvasScaled.toDataURL();
      setPicture({
        ...picture,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg,
        file: null,
      });
      let body = new FormData();
      fetch(croppedImg)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], picture.file.name, picture.file);
          console.log("file >>>", file);
          setFile(file);
        });
    }
  };

  const handleFileChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setPicture({
      ...picture,
      img: url,
      cropperOpen: true,
      file: e.target.files[0],
    });
  };
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required(appTranslations.REQUIRED)
      .min(3, appTranslations.VALIDATION_FULL_NAME),

    phone_no: Yup.string()
      .required(appTranslations.REQUIRED)
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        appTranslations.VALIDATION_MOBILE_NUMBER
      ),

    password: Yup.string()
      .required(appTranslations.REQUIRED)
      .min(6, appTranslations.VALIDATION_PASSWORD)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        appTranslations.VALIDATION_PASSWORD_MATCH
      ),
    cadre_type: Yup.string().required(
      appTranslations.UNSELECTED_DROPDOWN_CADRE_TYPE
    ),
    cadre_id: Yup.number()
      .required(appTranslations.UNSELECTED_DROPDOWN_CADRE_TYPE)
      .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_CADRE),
    state_id: Yup.number().when("cadre_type", {
      is: (cadre_type) => {
        if (
          cadre_type === "State_Level" ||
          cadre_type === "District_Level" ||
          cadre_type === "Block_Level" ||
          cadre_type === "Health-facility_Level"
        ) {
          return true;
        } else {
          return false;
        }
      },
      then: Yup.number()
        .required(appTranslations.UNSELECTED_DROPDOWN_CADRE_TYPE)
        .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_STATE),
    }),
    district_id: Yup.number().when("cadre_type", {
      is: (cadre_type) => {
        if (
          cadre_type === "District_Level" ||
          cadre_type === "Block_Level" ||
          cadre_type === "Health-facility_Level"
        ) {
          return true;
        } else {
          return false;
        }
      },
      then: Yup.number()
        .required(appTranslations.UNSELECTED_DROPDOWN_CADRE_TYPE)
        .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_CADRE),
    }),
    block_id: Yup.number().when("cadre_type", {
      is: (cadre_type) => {
        if (
          cadre_type === "Block_Level" ||
          cadre_type === "Health-facility_Level"
        ) {
          return true;
        } else {
          return false;
        }
      },
      then: Yup.number()
        .required(appTranslations.DROPDOWN_SELECT_CADRE_TYPE)
        .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_CADRE),
    }),
    health_facility_id: Yup.number().when("cadre_type", {
      is: (cadre_type) => {
        if (cadre_type === "Health-facility_Level") {
          return true;
        } else {
          return false;
        }
      },
      then: Yup.number()
        .required(appTranslations.DROPDOWN_SELECT_CADRE_TYPE)
        .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_CADRE),
    }),
  });

  useEffect(() => {
    try {
      dispatch(getAllState());
      dispatch(getAllCadreType());
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  return (
    <>
      <TitleTag title={"Signup"} />
      <section sx={{ variant: "layout.Section" }}>
        <Container>
          <Flex
            sx={{
              justifyContent: "center",
              py: "70px",
            }}
          >
            <Box bg="LightBlue" p={4} variant="Card">
              <div
                sx={{
                  marginBottom: 5,
                }}
              >
                <Text
                  sx={{
                    fontSize: [4, 5],
                    fontFamily: "body",
                    fontWeight: 500,
                    color: "Blue_Theme",
                  }}
                >
                  Create an account
                </Text>
              </div>

              <Formik
                initialValues={{
                  name: "",
                  phone_no: "",
                  password: "",
                  cadre_type: "",
                  country_id: 0,
                  cadre_id: 0,
                  state_id: 0,
                  district_id: 0,
                  block_id: 0,
                  health_facility_id: 0,
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                  const signupCallback = async (response) => {
                    console.log("onSubmit", response);
                    actions.setSubmitting(false);
                    if (response?.code == 200 && response.status) {
                      console.log("response >>>", response);
                      Cookies.set("V-uid", response?.data?.api_token);
                      history.push(
                        `/VerifyMobileNumber?uid=${response?.data?.api_token}&&number=${values.phone_no}`
                      );
                    } else {
                      if (response?.data?.phone_no?.[0]) {
                        actions.setFieldError("phone_no",response?.data?.phone_no?.[0])
                      } else {
                        setError(response?.data);
                      }
                    }
                  };
                  let body = new FormData();
                  body.append("name", values.name);
                  body.append("phone_no", values.phone_no);
                  body.append("password", values.password);
                  body.append("cadre_type", values.cadre_type);
                  body.append("country_id", values.country_id);
                  body.append("cadre_id", values.cadre_id);
                  body.append("state_id", values.state_id);
                  body.append("district_id", values.district_id);
                  body.append("block_id", values.block_id);
                  body.append("health_facility_id", values.health_facility_id);
                  body.append("profile_image", file);
                  dispatch(registerUser(body, signupCallback));
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                  setFieldError,
                  /* and other goodies */
                }) => {
                  handleChange = (name, value) => {
                    if (name === "cadre_type" && values.cadre_type !== value) {
                      dispatch(clearCadre());
                      dispatch(clearDistrict());
                      dispatch(clearBlock());
                      dispatch(clearHelth());
                      setFieldValue("cadre_type", value);
                      setFieldValue("cadre_id", 0);
                      setFieldValue("state_id", 0);
                      setFieldValue("district_id", 0);
                      setFieldValue("block_id", 0);
                      setFieldValue("health_facility_id", 0);
                      if (value === "National_Level") {
                        setFieldValue("country_id", 1);
                      } else {
                        setFieldValue("country_id", 0);
                      }
                      dispatch(getAllCadre(value));
                    } else if (
                      name === "cadre_id" &&
                      values.cadre_id !== parseInt(value)
                    ) {
                      // console.log('in handleChange cadre_id ', name, value);
                      setFieldValue("cadre_id", parseInt(value));
                    } else if (
                      name === "state_id" &&
                      values.state_id !== parseInt(value)
                    ) {
                      dispatch(clearDistrict());
                      dispatch(clearBlock());
                      dispatch(clearHelth());
                      setFieldValue("district_id", 0);
                      setFieldValue("block_id", 0);
                      setFieldValue("health_facility_id", 0);
                      // console.log('in handleChange state_id ', name, value);
                      setFieldValue("state_id", parseInt(value));
                      dispatch(getDistrictByState(parseInt(value)));
                    } else if (
                      name === "district_id" &&
                      values.district_id !== parseInt(value)
                    ) {
                      dispatch(clearBlock());
                      dispatch(clearHelth());
                      setFieldValue("block_id", 0);
                      setFieldValue("health_facility_id", 0);
                      // console.log('in handleChange district_id ', name, value);
                      setFieldValue("district_id", parseInt(value));
                      dispatch(getBlockByDistrict(parseInt(value)));
                    } else if (
                      name === "block_id" &&
                      values.block_id !== parseInt(value)
                    ) {
                      dispatch(clearHelth());
                      setFieldValue("health_facility_id", 0);
                      // console.log('in handleChange block_id ', name, value);
                      setFieldValue("block_id", parseInt(value));
                      dispatch(getHealthByBlock(parseInt(value)));
                    } else if (
                      name === "health_facility_id" &&
                      values.health_facility_id !== parseInt(value)
                    ) {
                      // console.log('in handleChange health_facility_id ', name, value);
                      setFieldValue("health_facility_id", parseInt(value));
                    } else {
                      // console.log('in handleChange else ', name, value);
                      setFieldValue(name, value);
                    }
                  };
                  return (
                    <>
                      <div sx={{ position: "relative", marginBottom: 4 }}>
                        <div className="text-center">
                          {picture.croppedImg ? (
                            <img
                              style={{}}
                              src={picture.croppedImg}
                              alt="ProfilePic"
                              sx={{ width: 200 }}
                              className="rounded-circle"
                            />
                          ) : (
                            <img
                              style={{}}
                              src="../../images/ProfilePic.png"
                              alt="ProfilePic"
                              sx={{ width: 200 }}
                            />
                          )}
                          <Button
                            style={{ width: 193 }}
                            py={12}
                            my={4}
                            backgroundColor="Blue_2"
                            color="white"
                            onClick={() => setModal(true)}
                          >
                            Add Photo
                          </Button>
                        </div>
                        <Heading
                          variant="Nunito18title"
                          sx={{ color: "Blue_2" }}
                          className="mb-1"
                        >
                          {appTranslations.TABLE_NAME}
                        </Heading>
                        <Input
                          variant="PersonalDetailsInput"
                          placeholder={appTranslations?.PLACEHOLDER_FULL_NAME}
                          autoFocus={true}
                          sx={{ py: 10, px: 15 }}
                          onChange={(event) =>
                            handleChange("name", event?.target?.value)
                          }
                          name="name"
                          onBlur={handleBlur("name")}
                          value={values.name}
                        />
                        <span className="text-danger">
                          {errors.name && touched.name && errors.name}
                        </span>
                      </div>
                      <div sx={{ position: "relative", marginBottom: 4 }}>
                        <Heading
                          variant="Nunito18title"
                          sx={{ color: "Blue_2" }}
                          className="my-1"
                        >
                          {appTranslations.PLACEHOLDER_MOBILE_NUMBER}
                        </Heading>
                        <Input
                          variant="PersonalDetailsInput"
                          placeholder={
                            appTranslations?.PLACEHOLDER_MOBILE_NUMBER
                          }
                          sx={{ py: 10, px: 15 }}
                          name="phone_no"
                          onChange={(event) =>
                            handleChange("phone_no", event?.target?.value)
                          }
                          onBlur={handleBlur("phone_no")}
                          value={values?.phone_no}
                          inputMode="numeric"
                        />
                        <span className="text-danger">
                          {errors.phone_no &&
                            touched.phone_no &&
                            errors.phone_no}
                        </span>
                      </div>

                      <div sx={{ position: "relative" }}>
                        <Heading
                          variant="Nunito18title"
                          sx={{ color: "Blue_2" }}
                          className="mb-1"
                        >
                          {appTranslations.PLACEHOLDER_PASSWORD}
                        </Heading>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          onChange={(event) =>
                            handleChange("password", event?.target?.value)
                          }
                          onBlur={handleBlur("password")}
                          value={values.password}
                          sx={{ py: 10, px: 15 }}
                        />
                        <span className="text-danger">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </span>
                      </div>
                      <div sx={{ marginBottom: 4, position: "relative" }}>
                        <Heading
                          variant="Nunito18title"
                          sx={{ color: "Blue_2" }}
                          className="my-1"
                        >
                          {appTranslations.CADER_TYPE}
                        </Heading>
                        <Select
                          arrow={
                            <Box
                              as="svg"
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              sx={{
                                ml: -40,
                                alignSelf: "center",
                                pointerEvents: "none",
                              }}
                            >
                              <path
                                d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z"
                                fill="#808080"
                              />
                            </Box>
                          }
                          sx={{ color: values.cadre_type !== "" && "Grey_3" }}
                          onChange={(event) =>
                            handleChange("cadre_type", event?.target?.value)
                          }
                          onBlur={handleBlur("cadre_type")}
                          name="cadre_type"
                          value={values.cadre_type}
                        >
                          <option value={-1}>
                            {appTranslations.CADER_TYPE}
                          </option>
                          {cadreType?.map((item, id) => {
                            return (
                              <option key={id} value={item.cadre_type}>
                                {item.cadre_type}
                              </option>
                            );
                          })}
                        </Select>
                        <span className="text-danger">
                          {errors.cadre_type &&
                            touched.cadre_type &&
                            errors.cadre_type}
                        </span>
                      </div>
                      <div sx={{ marginBottom: 4, position: "relative" }}>
                        <Heading
                          variant="Nunito18title"
                          sx={{ color: "Blue_2" }}
                          className="my-1"
                        >
                          {appTranslations.CADER}
                        </Heading>
                        <Select
                          arrow={
                            <Box
                              as="svg"
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              sx={{
                                ml: -40,
                                alignSelf: "center",
                                pointerEvents: "none",
                              }}
                            >
                              <path
                                d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z"
                                fill="#808080"
                              />
                            </Box>
                          }
                          sx={{ color: values.cadre_id > 0 && "Grey_3" }}
                          onChange={(event) =>
                            handleChange("cadre_id", event?.target?.value)
                          }
                          onBlur={handleBlur("cadre_id")}
                          name="cadre_id"
                          value={values.cadre_id}
                        >
                          <option value={-1}>
                            {appTranslations.DROPDOWN_SELECT_CADRE}
                          </option>
                          {cadre?.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            );
                          })}
                        </Select>
                        <span className="text-danger">
                          {errors.cadre_id &&
                            touched.cadre_id &&
                            errors.cadre_id}
                        </span>
                      </div>
                      {(values.cadre_type === "State_Level" ||
                        values.cadre_type === "District_Level" ||
                        values.cadre_type === "Block_Level" ||
                        values.cadre_type === "Health-facility_Level") && (
                        <div sx={{ marginBottom: 4, position: "relative" }}>
                          <Heading
                            variant="Nunito18title"
                            sx={{ color: "Blue_2" }}
                            className="my-1"
                          >
                            {appTranslations.HEADER_STATE}
                          </Heading>
                          <Select
                            arrow={
                              <Box
                                as="svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                sx={{
                                  ml: -40,
                                  alignSelf: "center",
                                  pointerEvents: "none",
                                }}
                              >
                                <path
                                  d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z"
                                  fill="#808080"
                                />
                              </Box>
                            }
                            sx={{ color: values.state_id > 0 && "Grey_3" }}
                            onChange={(event) =>
                              handleChange("state_id", event?.target?.value)
                            }
                            name="state_id"
                            disabled={state?.length == 0}
                            value={values.state_id}
                          >
                            <option value={-1}>
                              {appTranslations.DROPDOWN_SELECT_STATE}
                            </option>
                            {state?.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </Select>
                          <span className="text-danger">
                            {errors.state_id &&
                              touched.state_id &&
                              errors.state_id}
                          </span>
                        </div>
                      )}
                      {(values.cadre_type === "District_Level" ||
                        values.cadre_type === "Block_Level" ||
                        values.cadre_type === "Health-facility_Level") && (
                        <div sx={{ marginBottom: 4, position: "relative" }}>
                          <Heading
                            variant="Nunito18title"
                            sx={{ color: "Blue_2" }}
                            className="my-1"
                          >
                            {appTranslations.DISTRICT}
                          </Heading>
                          <Select
                            arrow={
                              <Box
                                as="svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                sx={{
                                  ml: -40,
                                  alignSelf: "center",
                                  pointerEvents: "none",
                                }}
                              >
                                <path
                                  d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z"
                                  fill="#808080"
                                />
                              </Box>
                            }
                            sx={{ color: values.district_id > 0 && "Grey_3" }}
                            disabled={district?.length == 0}
                            onChange={(event) =>
                              handleChange("district_id", event?.target?.value)
                            }
                            name="district_id"
                            value={values.district_id}
                          >
                            <option value={-1}>
                              {appTranslations.DROPDOWN_SELECT_DISTRICT}
                            </option>
                            {district?.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </Select>
                          <span className="text-danger">
                            {errors.district_id &&
                              touched.district_id &&
                              errors.district_id}
                          </span>
                        </div>
                      )}
                      {(values.cadre_type === "Block_Level" ||
                        values.cadre_type === "Health-facility_Level") && (
                        <div sx={{ marginBottom: 4, position: "relative" }}>
                          <Heading
                            variant="Nunito18title"
                            sx={{ color: "Blue_2" }}
                            className="my-1"
                          >
                            TU
                          </Heading>
                          <Select
                            arrow={
                              <Box
                                as="svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                sx={{
                                  ml: -40,
                                  alignSelf: "center",
                                  pointerEvents: "none",
                                }}
                              >
                                <path
                                  d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z"
                                  fill="#808080"
                                />
                              </Box>
                            }
                            sx={{ color: values.block_id > 0 && "Grey_3" }}
                            disabled={block?.length == 0}
                            onChange={(event) =>
                              handleChange("block_id", event?.target?.value)
                            }
                            name="block_id"
                            value={values.block_id}
                          >
                            <option value={-1}>
                              {appTranslations.DROPDOWN_SELECT_TU}
                            </option>
                            {block?.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </Select>
                          <span className="text-danger">
                            {errors.block_id &&
                              touched.block_id &&
                              errors.block_id}
                          </span>
                        </div>
                      )}
                      {values.cadre_type === "Health-facility_Level" && (
                        <div sx={{ marginBottom: 4, position: "relative" }}>
                          <Heading
                            variant="Nunito18title"
                            sx={{ color: "Blue_2" }}
                            className="my-1"
                          >
                            {appTranslations.HEADER_HEALTH_FACILITY}
                          </Heading>
                          <Select
                            arrow={
                              <Box
                                as="svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                sx={{
                                  ml: -40,
                                  alignSelf: "center",
                                  pointerEvents: "none",
                                }}
                              >
                                <path
                                  d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z"
                                  fill="#808080"
                                />
                              </Box>
                            }
                            sx={{
                              color: values.health_facility_id > 0 && "Grey_3",
                            }}
                            disabled={health?.length == 0}
                            onChange={(event) =>
                              handleChange(
                                "health_facility_id",
                                event?.target?.value
                              )
                            }
                            name="health_facility_id"
                            value={values.health_facility_id}
                          >
                            <option value={-1}>
                              {appTranslations.DROPDOWN_SELECT_HEALTHFACILITY}
                            </option>
                            {health?.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.health_facility_code}
                                </option>
                              );
                            })}
                          </Select>
                          <span className="text-danger">
                            {errors.health_facility_id &&
                              touched.health_facility_id &&
                              errors.health_facility_id}
                          </span>
                        </div>
                      )}
                      <div className="col-lg-12">
                        <span className="text-danger">{error}</span>
                      </div>

                      <div
                        className="text-end"
                        sx={{
                          marginBottom: 6,
                        }}
                      ></div>
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <Button py={10} type="submit" onClick={handleSubmit}>
                            Create an account
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <NavLink to="" sx={{ textDecorationLine: "none" }}>
                          <Text variant={"Nunito12"} color={"Blue_2"}>
                            Follow us on social media
                          </Text>
                        </NavLink>
                      </div>
                      <Flex sx={{ justifyContent: "space-between" }}>
                        <div>
                          <img
                            src={"../images/facebook.svg"}
                            alt="facebook"
                            sx={{ mr: "2px" }}
                          />
                          <NavLink to="" sx={{ textDecorationLine: "none" }}>
                            <Text variant={"Nunito12"} color={"Blue_2"}>
                              Ni-kshay.Setu
                            </Text>
                          </NavLink>
                        </div>
                        <div>
                          <img
                            src={"../images/instagram.svg"}
                            alt="instagram"
                            sx={{ mr: "2px" }}
                          />
                          <NavLink to="" sx={{ textDecorationLine: "none" }}>
                            <Text variant={"Nunito12"} color={"Blue_2"}>
                              Ni-kshay.Setu
                            </Text>
                          </NavLink>
                        </div>
                      </Flex>
                    </>
                  );
                }}
              </Formik>
            </Box>
          </Flex>
        </Container>
        <CustomModal
          isOpen={model}
          closeModal={() => {
            setModal(false);
          }}
        >
          <div className="text-center">
            {picture.cropperOpen ? (
              <AvatarEditor
                ref={setEditorRef}
                image={picture.img}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
                onMouseMove={(e) => console.log("e >>>>>>", e)}
              />
            ) : (
              <img
                style={{}}
                src={picture.croppedImg}
                alt="ProfilePic"
                sx={{ width: 200 }}
                className="rounded-circle"
              />
            )}
            <Heading
              variant="Raleway18"
              sx={{ color: "Grey_3" }}
              className="mt-4"
            >
              Choose Photo
            </Heading>
            {picture.cropperOpen ? (
              <div className="mt-3">
                <Button
                  style={{}}
                  py={12}
                  backgroundColor="Blue_2"
                  color="white"
                  onClick={handleSave}
                  className="me-3"
                >
                  {appTranslations.BTN_C_ASMENT_SAVE}
                </Button>
                <Button
                  style={{}}
                  py={12}
                  backgroundColor="Blue_2"
                  color="white"
                  onClick={handleCancel}
                >
                  {appTranslations.BTN_CANCEL}
                </Button>
              </div>
            ) : (
              <>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <img
                    style={{}}
                    src="../../images/GalleryIcon.png"
                    alt="Icon"
                    sx={{ width: 24 }}
                    className="me-3"
                  />
                  <Heading variant="Raleway18" sx={{ color: "white" }}>
                    Gallery
                  </Heading>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="profile_image"
                />
              </>
            )}
          </div>
        </CustomModal>
      </section>
    </>
  );
};
export default Signup;
