/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Grid, Heading } from 'theme-ui';
import { useSelector } from 'react-redux';
import { getImage } from '../../utils/functions';
import { useHistory } from 'react-router-dom';

const AllModules = () => {
    const { dynamicAlogs } = useSelector(state => state?.app);
    const { appTranslations } = useSelector(
        state => state?.app,
    );
    const history = useHistory()
    return (
        <React.Fragment>
            {dynamicAlogs?.map((sectionItem, i) => {
                return (
                    <React.Fragment key={"sectionItem" + i}>
                        <div className="section-title">
                            <Heading sx={{ mb: 4, fontSize: [2, 3], color: "colorDark1" }} variant="Raleway18">{appTranslations?.[sectionItem?.sectionTitle] || sectionItem?.sectionTitle}</Heading>
                        </div>
                        <Grid gap={4} columns={[2, 3, null, 5]}>
                            {sectionItem?.data?.map((item, i) => {
                                return (
                                    <div key={"sectionItem - " + i + " - " + item?.cardTitle}
                                        onClick={() => {
                                            console.log("item.link", item);
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
                                                    history.push(`ResourceMaterials/Material?name=${item.cardTitle}&&type=${item.id}&&parent_id=${item.id}`)
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
                                                    if (item.type == 'Dynamic') {
                                                        history.push(`/AlgorithmList?name=${item?.title}${item.type ? '&&type=' + item.type : ''}&&link=${item?.link}${item.id ? '&&algo_Id=' + item.id : ''}`)
                                                    } else if (item.id) {
                                                        history.push(`/AlgorithmList/AlgorithmDetails?name=${item?.title}${item.type ? '&&type=' + item.type : ''}&&link=${item?.link}${item.id ? '&&id=' + item.id : ''}`)
                                                    } else {
                                                        history.push(`/AlgorithmList?name=${item?.title}${item.type ? '&&type=' + item.type : ''}&&link=${item?.link}${item.id ? '&&algo_Id=' + item.id : ''}`)
                                                    }
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}
                                    >
                                        <Box variant="TopModules">
                                            <Flex sx={{ alignItems: 'center', flexDirection: 'column', }}>
                                                <img src={getImage(item?.type, item?.icon, item?.imageUrl)} alt="logo" sx={{ textAlign: "center", marginBottom: 3, height: 50 }} />
                                                <Heading as='h6' variant="Nunito18title" sx={{ color: "Grey_4" }}>{appTranslations?.[item?.cardTitle] || item?.cardTitle}</Heading>
                                            </Flex>
                                        </Box>
                                    </div>
                                );
                            })}
                        </Grid>
                        <hr sx={{ variant: "hr" }} />
                    </React.Fragment>
                )
            })}
        </React.Fragment>

    );
}
export default AllModules;