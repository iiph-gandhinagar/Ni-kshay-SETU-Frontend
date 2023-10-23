/** @jsxImportSource theme-ui */
import React, { useEffect } from 'react';
import { Box, Flex, Heading, Paragraph } from 'theme-ui';
import ReactStars from "react-rating-stars-component";
const RatingCard = ({ title, Descriptions, ImgSrc, onSetRating, value }) => {
  useEffect(() => {
    onSetRating(5);
  }, []);
  return (
    <Box sx={{}} className="p-1" variant="FeedBackBox">
      <Flex sx={{ alignItems: 'center' }} className="mb-2">
        <img src={ImgSrc} alt="tblogo" className="me-2" sx={{ width: 35 }} />
        <Heading variant="Heading4" sx={{ color: "Blue_2" }}>{title}</Heading>
      </Flex>
      <Paragraph variant="Nunito18title" sx={{ color: "Grey_3" }}>{Descriptions}</Paragraph>
      <Flex sx={{ justifyContent: 'center' }} className="mb-2">
        <ReactStars
          count={5}
          value={value}
          onChange={onSetRating}
          size={50}
          activeColor="#ffd700"
        />
      </Flex>
    </Box>

  );
}
export default RatingCard;