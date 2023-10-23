/** @jsxImportSource theme-ui */
import queryString from 'query-string';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Container, Grid, Heading } from 'theme-ui';
import { getImage } from '../../utils/functions';
const Algorithms = (props) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { appTranslations, dynamicAlogs, loader } = useSelector(state => state?.app);
    const queryObj = queryString?.parse(props.location?.search)
    return (
        <section sx={{ variant: 'layout.Home' }}>
            <Container>
                <Heading sx={{ mb: 4, pt: 8 }} variant="Raleway18">{appTranslations[queryObj.name]}</Heading>
                <Grid gap={7} columns={[2, null, 3, 4, 5]} sx={{ pt: 8 }}>
                    {
                        dynamicAlogs?.find((item) => item?.sectionKey == queryObj?.sectionKey)?.data?.map((item, i) => {

                            return (
                                <div onClick={() => {
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
                                            history.push(`/AlgorithmList?name=${item?.cardTitle}${item.type ? '&&type=' + item.type : ''}&&link=${item?.link}${item.id ? '&&algo_Id=' + item.id : ''}`)
                                            break;
                                        default:
                                            break;
                                    }
                                }}>
                                    <Box variant="AlgorithmListCard" sx={{}} className="pb-1">
                                        <Box variant="AlgorithmListCardImage" className="rounded-circle d-flex justify-content-center align-items-center">
                                            <img src={getImage(item?.type, item?.icon, item?.imageUrl)} alt="logo" sx={{ height: 50, width: 50, }} />
                                        </Box>
                                        <Heading variant="Nunito18title" className="mt-1" sx={{ color: "Blue_Theme" }}>{appTranslations[item.cardTitle] || item.cardTitle}</Heading>
                                    </Box>
                                </div>
                            )
                        })}
                </Grid>
            </Container>
        </section>
    );
}
export default Algorithms; 