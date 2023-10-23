/** @jsxImportSource theme-ui */
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { getUserData, updateUserData } from '@tb-frontend/shared/Store/action/usersActions';
import React, { useEffect, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Heading } from 'theme-ui';
import CustomModal from '../../components/Modals/CustomModal';
import TitleTag from '../../components/TitleTag';

const EditProfilePicture = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state?.user);
  const { appTranslations } = useSelector((state) => state?.app);
  const media = userData?.[0]?.media?.[0];
  var editor = "";
  const [model, setModal] = useState(false);
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg: "../../images/Ellipse.png"
  });

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false
    });
  };
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  const updateCallback = async response => {
    console.log('onSubmit', response);
    if (response?.code == 200) {
      dispatch(getUserData());
      setModal(false);
    } else {
      console.log('Error!', response?.data);
    }
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
        file: null
      });
      let body = new FormData();
      fetch(croppedImg)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], picture.file.name, picture.file)
          body.append('cadre_type', userData[0]?.cadre_type);
          body.append('profile_image', file);
          dispatch(updateUserData(body, updateCallback));
        })


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
  return (
    <>
      <TitleTag title="Edit Profile Picture" />
      <section sx={{ variant: 'layout.Home' }}>
        <Container sx={{ mt: 50 }}>
          <div className="row align-items-center">
            <div className="col-12">
              <Heading variant="Nunito11" sx={{ color: "Grey_3" }} className="">{appTranslations.EDIT_PROFILE_PICTURE}</Heading>
              <hr sx={{ variant: "ProfileHr", mb: 7 }} />
              <Box className="personal-details text-center text-white mx-auto" variant="PersonalDetails" py={124}>
                {media ?
                  <img style={{}} src={BASE_MEDIA_URL + media?.thumb_100} alt="ProfilePic" sx={{ width: 200 }} className="rounded-circle" />
                  :
                  <img style={{}} src="../../images/ProfilePic.png" alt="ProfilePic" sx={{ width: 200 }} />
                }
              </Box>
              <div className="text-center">
                <Button style={{ width: 193 }} py={12} backgroundColor="Blue_2" color="white" onClick={() => setModal(true)}>{appTranslations.EDIT_PROFILE_PICTURE}</Button>
              </div>
            </div>
          </div>
        </Container>
        <CustomModal
          isOpen={model}
          closeModal={() => {
            setModal(false);
          }} >
          <div className="text-center">
            {picture.cropperOpen ?
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
              /> :
              <img style={{}} src={picture.croppedImg} alt="ProfilePic" sx={{ width: 200 }} className="rounded-circle" />
            }
            <Heading variant="Raleway18" sx={{ color: "Grey_3" }} className="mt-4">Choose Photo</Heading>
            {picture.cropperOpen ?
              <div className="mt-3">
                <Button style={{}} py={12} backgroundColor="Blue_2" color="white" onClick={handleSave} className="me-3">{appTranslations.BTN_C_ASMENT_SAVE}</Button>
                <Button style={{}} py={12} backgroundColor="Blue_2" color="white" onClick={handleCancel}>{appTranslations.BTN_CANCEL}</Button>
              </div>
              :
              <>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <img style={{}} src="../../images/GalleryIcon.png" alt="Icon" sx={{ width: 24 }} className="me-3" />
                  <Heading variant="Raleway18" sx={{ color: "white" }} >Gallery</Heading>
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} name='profile_image' />
              </>}
          </div>
        </CustomModal>
      </section>
    </>
  );
}
export default EditProfilePicture;