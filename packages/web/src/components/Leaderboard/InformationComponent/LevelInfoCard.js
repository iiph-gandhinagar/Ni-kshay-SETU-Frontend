/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Grid, Heading, Text, Paragraph } from 'theme-ui';
const LevelInfoCard = ({ Level, TitleLvl, description, TopColor, colored, BronzeImg, GoldImg, SilverImg }) => {
  return (
    <div className="col-md-6 col-xxl-5 mb-3 mb-md-0">
      <div className="card text-white mb-3" >
        <div className="card-header" style={{ backgroundColor: TopColor }}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', }}>
            <Heading variant="Nunito18title" sx={{}}>Level {Level}</Heading>
            <Heading variant="Nunito18title" sx={{}}>{TitleLvl}</Heading>
          </Flex>

        </div>
        <div className="card-body p-2 text-center rounded-bottom" style={{ background: colored }}>
          <Paragraph className="card-text mb-4" variant="Nunito">{description}</Paragraph>
          <div className="d-flex justify-content-between mx-2 mt-1">
            <div>
              <img style={{}} src={BronzeImg} alt="Picture" sx={{ width: 65 }} className="mb-1" />
              <Heading variant="Nunito12" sx={{}}>Bronze</Heading>
            </div>
            <div>
              <img style={{}} src={GoldImg} alt="Picture" sx={{ width: 65, marginTop: -13 }} className="mb-1" />
              <Heading variant="Nunito12" sx={{}}>Gold</Heading>
            </div>
            <div>
              <img style={{}} src={SilverImg} alt="Picture" sx={{ width: 65 }} className="mb-1" />
              <Heading variant="Nunito12" sx={{}}>Silver</Heading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LevelInfoCard;