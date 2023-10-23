/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Flex, Grid, Heading } from 'theme-ui';
import { getImage } from '../../utils/functions';
const TopModules = (props) => {
    const { topModules } = useSelector(state => state?.app);
    const history = useHistory()
    const {appTranslations} = useSelector(state => state?.app);
    return (
        <div className="home-page-section" >
            <Grid gap={4} columns={[2, 3, null, 5]}>
                {topModules?.most_usefull?.map((item, i) => {
                    return (
                        <div key={"topModules" + i} onClick={() => {
                            switch (item.link) {
                                case 'Screening':
                                    history.push("/Screening")
                                    break;
                                case 'survey':
                                    history.push("/Survey")
                                    break;
                                case 'rating':
                                    history.push("/FeedBack");
                                    break;
                                case 'certificate':
                                    history.push("/Certificates")
                                    break;
                                case 'ResourceMaterials':
                                    // navigation.navigate('Materials', item);
                                    break;
                                case 'ReferralHealthFacility':
                                    history.push("/SearchHealthFacility")
                                    break;
                                case 'CurrentAssessments':
                                    // navigation.navigate('Assessment', {
                                    // screen: 'CurrentAssessment',
                                    // });
                                    break;
                                case 'PastAssessments':
                                    // navigation.navigate('Assessment', {
                                    //     screen: 'PastAssessment',
                                    // });
                                    break;
                                case 'AlgorithmList':
                                    history.push(`/AlgorithmList?name=${item?.title}${item.type ? '&&type=' + item.type : ''}&&link=${item?.link}${item.id ? '&&algo_Id=' + item.id : ''}`)
                                    break;
                                default:
                                    break;
                            }
                        }}>
                            <Box variant="TopModules">
                                <Flex sx={{ alignItems: 'center', flexDirection: 'column', }}>
                                    <img src={getImage(item.type)} alt="logo" sx={{ textAlign: "center", marginBottom: 3, height: 50 }} />
                                    <Heading as='h6' variant="Nunito18title" sx={{ color: "Grey_4" }}>{item.title}</Heading>
                                </Flex>
                            </Box>
                        </div>
                    );
                })}
                <div onClick={() => history.push("MoreTools")}>
                    <Box variant="TopModules">
                        <Flex sx={{ alignItems: 'center', flexDirection: 'column', }}>
                            <img src={"../../images/MoreTools.png"} alt="logo" sx={{ textAlign: "center", marginBottom: 3, height: 50 }} />
                            <Heading as='h6' variant="Nunito18title" sx={{ color: "Grey_4" }}>{appTranslations?.MORE_TOOLS}</Heading>
                        </Flex>
                    </Box>
                </div>
            </Grid>
        </div>
    );
}
export default TopModules;