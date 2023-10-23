/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Heading, Text } from 'theme-ui';
import ProgressLine from '../components/Leaderboard/ProgressLine';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
const ProfileContainer = ({ ShowAppPerformance }) => {
  const userDetails = useSelector(state => state?.user?.userData);
  const media = userDetails?.[0]?.media?.[0];
  return (
    <>
      {media ?
        <img src={BASE_MEDIA_URL + media?.thumb_100}
          alt="ProfilePic"
          sx={{ width: 100, borderRadius: 1000 }}
          className="mx-auto mt-4 mb-3" />
        :
        <img
          src="../../../images/ProfilePic.png"
          alt="ProfilePic"
          style={{ backgroundColor: '#FFF' }}
          sx={{ width: 100, borderRadius: 1000 }}
          className="mx-auto mt-4 mb-3" />
      }

      <Heading className="pt-1 text-center mb-3" variant="Nunito18title" color="white">{userDetails?.[0]?.name}</Heading>
      <Heading className="pt-1 text-center" variant="Nunito18title" color="white">App performance Level: </Heading>
      <Heading className="text-center" variant="Nunito18title" color="white">{userDetails?.[0]?.level_title}</Heading>
      {ShowAppPerformance ?
        <ProgressLine
          customClass={"pe-2"}
          customPercentage={
            <Text variant="Nunito18title" sx={{ color: "Grey_2" }} className="me-2">{parseFloat(userDetails?.[0]?.percentage).toFixed(1) || 0}%</Text>}
          visualParts={[
            {
              percentage: parseFloat(userDetails?.[0]?.percentage).toFixed(2) || 0,
              color: "#FA967E",
            }
          ]}
          boxShadow="0px 4px 4px rgb(0 0 0 / 25%)"
        />
        :
        ""}
    </>
  );
}
export default ProfileContainer;