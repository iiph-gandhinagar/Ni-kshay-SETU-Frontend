/** @jsxImportSource theme-ui */
import queryString from 'query-string';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Container, Grid, Heading } from 'theme-ui';
import { getImage } from '../../utils/functions';

const ResourceMaterials = () => {
    const history = useHistory()
    const { appTranslations, dynamicAlogs, loader } = useSelector(state => state?.app);
    const queryObj = queryString?.parse(history.location?.search)
    return (
        <section sx={{ variant: 'layout.Home' }}>
            <Container>
                <Heading sx={{ mb: 4, pt: 8 }} variant="Raleway18">{appTranslations[queryObj.name]}</Heading>
                <Grid gap={7} columns={[2, null, 3, 4, 5]} sx={{ pt: 8 }}>
                    {dynamicAlogs.find((item) => item.sectionKey == 'RESOURCE_MATERIALS',)?.data?.map((item, i) => {
                        return (
                            <div onClick={() => {
                                history.push(`ResourceMaterials/Material?name=${item.cardTitle}&&type=${item.id}&&parent_id=${item.id}`)
                            }}>
                                <Box variant="AlgorithmListCard" sx={{}} className="pb-1">
                                    <Box variant="AlgorithmListCardImage"
                                        className="rounded-circle d-flex justify-content-center align-items-center">
                                        <img
                                            src={getImage(item?.type, item?.icon, item?.imageUrl)}
                                            alt="logo" style={{ height: 50, width: 50, }} />
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
export default ResourceMaterials;