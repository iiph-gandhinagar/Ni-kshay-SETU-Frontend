/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel3';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, Text } from 'theme-ui';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';

const options = {
  loop: true,
  nav: false,
  dots: true,
  margin: 30,
  autoplayHoverPause: false,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 2,
    },
    1200: {
      dotsEach: 1,
      items: 3,
    }
  }
}
const NewsFeed = (props) => {
  const [display, setDisplay] = useState(false);
  const { flashNews } = useSelector(state => state?.app);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  

  useEffect(() => {
    setDisplay(true)
  }, []);
  return (
    <div className="home-page-section" >
      <hr sx={{ variant: "hr" }} />
      <div className="section-title">
        <Heading sx={{ mb: 4, fontSize: [2, 3], color: "colorDark1" }} variant="Raleway18">{appTranslations?.	N_NEWS_FEED}</Heading>
      </div>
      <div className="row justify-content-xl-between pt-2">
        {flashNews.length > 0 && display ? <OwlCarousel
          className="newsfeed-slides owl-carousel owl-theme Feedback-owl"
          {...options}
        >
          {flashNews?.map((item, i) => {
            return (
              <Box onClick={() => window.open(item?.href, "_blank")} variant="NewsFeed" key={"flashNews" + i}>
                <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {item?.media?.[0] ?
                    <img src={item?.media?.[0] ? BASE_MEDIA_URL + item?.media?.[0]?.id + '/' + item?.media?.[0]?.file_name : undefined} alt="tbmukt" sx={{}} className="tbmukt-image" />
                    :
                    <img src={"../../images/tbmukt.png"} alt="tbmukt" sx={{}} className="tbmukt-image" />
                  }
                  <div>
                    <Heading variant="Raleway18" sx={{ color: "Blue_2" }} className="title mb-2">{item.title}</Heading>
                    <Text as="h6" variant="Nunito16" sx={{ color: "Grey_3" }} className="text-break">Source : {item.source}</Text>
                    <Text variant="Nunito11" sx={{ color: "Grey_4" }}>{item.publish_date}</Text>
                  </div>
                </Flex>
              </Box>
            );
          })}
        </OwlCarousel> : ''}
      </div>
    </div>

  );
}
export default NewsFeed;