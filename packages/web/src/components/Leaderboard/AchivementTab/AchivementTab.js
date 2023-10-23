/** @jsxImportSource theme-ui */
import { getAchivement } from "@tb-frontend/shared/Store/action/leaderBoardAction";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Heading, Link, Text } from 'theme-ui';
import { VictoryPie } from 'victory';
import Cloud from "../../../assets/Animations/cloud4.json";
import Rocket from "../../../assets/Animations/Rocket.json";

const AchivementTab = () => {
  const { achivement } = useSelector(state => state?.leaderBoard);
  const appTranslations = useSelector(state => state?.app?.appTranslations);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAchivement());
  }, [])
  return (
    <div className="achivement" sx={{ mt: 7 }} >
      <div className="row mx-0 justify-content-center">
        <div className="col-xl-9 col-xxl-6">
          <div className="animation-box">
            <Lottie animationData={Cloud} loop={true} />
            <Lottie animationData={Rocket} loop={true} className="rocket" />
            <Heading variant="Raleway18ExtraBold" sx={{ color: "Blue_Theme" }} className="level-achieved">Current Level</Heading>
            <Heading variant="Raleway20Bold" className="level">{achivement?.level || ''}</Heading>
          </div>
        </div>
      </div>
      <div className="row mx-0 justify-content-center">
        <div className="col-xxl-2 col-xl-3 col-sm-4">
          <Box variant="MedalBox" className="p-2 mb-4 medal-box">
            <Heading variant="Nunito16" sx={{ color: "Blue_Theme" }} className="text-center" >{appTranslations.BRONZE_MEDAL}</Heading>
            <div className="position-relative mx-auto chart">
              <svg viewBox="0 0 400 400">
                <VictoryPie
                  standalone={false}
                  width={400}
                  height={400}
                  data={[{
                    'key': "", 'y': (achivement?.achive_bronze_medal * 100 /
                      achivement?.total_bronze_medal || 0)
                  }, {
                    'key': "", 'y': (100)
                  }]}
                  labelComponent={<span />}
                  innerRadius={120}
                  labelRadius={100}
                  colorScale={["#FFAB2D", "#F5F5F5"]}
                />
              </svg>
              <img style={{}} src="../../../images/Star1.png" alt="Star1" sx={{ width: 60 }} className="star" />
            </div>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Text variant="Nunito14" sx={{ color: "Blue_Theme" }}>Achieved</Text>
              <Text variant="Nunito12" sx={{ color: "Blue_2" }}>{achivement?.achive_bronze_medal}</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text variant="Nunito14" sx={{ color: "Blue_Theme" }}>Pending</Text>
              <Text variant="Nunito12" sx={{ color: "orange" }}>{achivement?.total_bronze_medal - achivement?.achive_bronze_medal}</Text>
            </Flex>

          </Box>
        </div>
        <div className="col-xxl-2 col-xl-3 col-sm-4">
          <Box variant="MedalBox" className="p-2 mb-4 medal-box">
            <Heading variant="Nunito16" sx={{ color: "Blue_Theme" }} className="text-center">{appTranslations.SILVER_MEDAL}</Heading>
            <div className="position-relative mx-auto chart">
              <svg viewBox="0 0 400 400">
                <VictoryPie
                  standalone={false}
                  width={400} height={400}
                  data={[{
                    'key': "", 'y': (achivement?.achive_silver_medal * 100 /
                      achivement?.total_silver_medal || 0)
                  }, {
                    'key': "", 'y': 100
                  }]}
                  labelComponent={<span />}
                  innerRadius={120} labelRadius={100}
                  colorScale={["#8A8A8A", "#F5F5F5"]}
                />
              </svg>
              <img style={{}} src="../../../images/Star2.png" alt="Star2" sx={{ width: 60 }} className="star" />
            </div>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Text variant="Nunito14" sx={{ color: "Blue_Theme" }}>Achieved</Text>
              <Text variant="Nunito12" sx={{ color: "Blue_2" }}>{achivement?.achive_silver_medal || 0}</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text variant="Nunito14" sx={{ color: "Blue_Theme" }}>Pending</Text>
              <Text variant="Nunito12" sx={{ color: "orange" }}>{
                achivement?.total_silver_medal - achivement?.achive_silver_medal ||
                0
              }</Text>
            </Flex>

          </Box>
        </div>
        <div className="col-xxl-2 col-xl-3 col-sm-4">
          <Box variant="MedalBox" className="p-2 mb-4 medal-box">
            <Heading variant="Nunito16" sx={{ color: "Blue_Theme" }} className="text-center" >{appTranslations.GOLD_MEDAL}</Heading>
            <div className="position-relative mx-auto chart">
              <svg viewBox="0 0 400 400">
                <VictoryPie
                  standalone={false}
                  width={400} height={400}
                  data={[{ 'key': "", 'y': achivement?.achive_gold_medal * 100 / achivement?.total_gold_medal || 0 }, { 'key': "", 'y': 100 }]}
                  labelComponent={<span />}
                  innerRadius={120} labelRadius={100}
                  colorScale={["#EFD701", "#F5F5F5"]}
                />
              </svg>
              <img style={{}} src="../../../images/Star3.png" alt="Star3" sx={{ width: 60 }} className="star" />
            </div>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Text variant="Nunito14" sx={{ color: "Blue_Theme" }}>Achieved</Text>
              <Text variant="Nunito12" sx={{ color: "Blue_2" }}>{achivement?.achive_gold_medal || 0}</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text variant="Nunito14" sx={{ color: "Blue_Theme" }}>Pending</Text>
              <Text variant="Nunito12" sx={{ color: "orange" }}>{achivement?.total_gold_medal - achivement?.achive_gold_medal || 0}</Text>
            </Flex>

          </Box>
        </div>
      </div>
      <div className="row mx-0 justify-content-center mt-4">
        <div className="col-xl-9 col-xxl-6">
          <Link href="/Certificates" className="navbar-brand">
            <Box variant="CertificatesBox" className="mb-3">
              <Flex sx={{ alignItems: 'center' }}>
                <img style={{}} src="../../../images/certi.png" alt="Picture" sx={{ width: 60 }} className="me-2" />
                <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', width: "100%" }} className="ms-1">
                  <Text variant="Raleway20" sx={{ color: "white" }}>Assessment Completion Certificates</Text>
                  <Text variant="Raleway22" sx={{ color: "white" }}>12</Text>
                </Flex>
              </Flex>
            </Box>
          </Link>
        </div>
      </div>
    </div>

  );
}
export default AchivementTab;