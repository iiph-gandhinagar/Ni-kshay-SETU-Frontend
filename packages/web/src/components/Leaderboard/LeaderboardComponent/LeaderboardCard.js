/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Grid, Heading } from 'theme-ui';
import ProgressLine from '../ProgressLine';
const LeaderboardCard = ({
  name,
  ImgUrl,
  subTitle,
  rank,
  percentage,
  isUser,
}) => {
  return (
    <div className={"card mb-3 leaderboard-card border-0"} style={{ background: isUser ? "#EDFFF1" : "#FFF" }} >
      <div className="row g-0 align-items-center">
        <div className="col-auto">
          <img style={{}} src={ImgUrl ? ImgUrl : "images/ProfilePic.png"} alt="Picture" sx={{ width: 60, borderRadius: 60 }} className="m-3 me-1 " />
        </div>
        <div className="col">
          <div className="card-body p-2">
            <Heading variant="Nunito18title" sx={{ color: "Blue_2" }}>{name}</Heading>
            <Heading variant="Nunito12" sx={{ color: "Blue_2" }}>{subTitle}</Heading>
            <Heading variant="Nunito18title" sx={{ color: "Grey_4" }}>App performance Level: {rank}</Heading>
            <ProgressLine
              visualParts={[
                {
                  percentage: percentage || 0,
                  color: "#FA967E"
                }
              ]}
              customClass="mb-0"
              customPercentage={<Heading variant="Nunito12" sx={{ color: "Grey_4" }}>{percentage || 0}%</Heading>}
            />
          </div>
        </div>
      </div>
    </div>

  );
}
export default LeaderboardCard;