/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Button, Heading, Text } from 'theme-ui';
const AssessmentListCard = ({ headerTitle, Quetions, min, BtnName, onClick, ReleasesDateTime, IsBtnDisable }) => {
    return (
        <div className="col-xxl-5 col-sm-6">
            <Box variant="AssessmentListCard" className="mb-3 ps-3 assessment-card position-relative h-100">
                {ReleasesDateTime ?
                    <Heading variant="RalewayText12" sx={{ color: "Grey_4", py: "3px", backgroundColor: "Grey_1" }} className="text-center rounded-top releases-date-time w-100">{ReleasesDateTime}</Heading> : ""}
                <img style={{}} src="../../../images/AssessmentBg.png" alt="AssessmentBg" sx={{ width: 150 }} className="assessment-bg" />
                <Heading variant="Raleway18" sx={{ color: "Blue_Theme", mt: ReleasesDateTime ? 15 : 0 }} className="mb-3">{headerTitle}</Heading>
                <div className="row align-items-end">
                    <div className="col">
                        <Box className="mb-3 rounded text-center" sx={{ color: "Blue_2", backgroundColor: "LightBlue", px: "3px", pb: "3px", width: 110 }} >
                            <Text variant="Nunito16" >{Quetions} Quetions</Text>
                        </Box>
                        <Box sx={{ color: "Blue_2", backgroundColor: "LightBlue", px: "3px", pb: "3px", width: 110 }} className="rounded">
                            <div className="d-flex justify-content-evenly align-items-center">
                                <img style={{}} src="../../../images/access-time.png" alt="access-time" sx={{ width: 15, mr: "3px" }} className="" />
                                <Text variant="Nunito16">{min} min.</Text>
                            </div>
                        </Box>
                    </div>
                    <div className="col">
                        <Box className="text-end">
                            <Button style={{ width: 108 }} backgroundColor="tealGreen" color="white" className="p-1" onClick={onClick} disabled={IsBtnDisable}><Heading variant="Raleway18">{BtnName}</Heading></Button>
                        </Box>
                    </div>
                </div>
            </Box>
        </div>

    );
}
export default AssessmentListCard;