/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, Text } from 'theme-ui';
const ReferralHealthFacilityCard = ({ facilityName, item }) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${item?.latitude},${item?.longitude}`;
    const healthFacilitiesList = item => {
        const keys = Object.keys(item).filter(v => item[v] === 1 && facilityName?.[v]);
        return keys;
    };
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <Box key={"ReferralHealthFacilityCard-" + item?.id} bg="foreground" variant={"ReferralHealthFacilityCard"}>
            <Heading variant="Raleway18" sx={{ color: "Blue_Theme", }}>{item?.health_facility_code}</Heading>
            <div sx={{ mb: "5px" }}>
                <Text variant="RalewayTitle" sx={{ color: "Blue_2" }}>{item?.state?.title}</Text>
                <img src="images/Line.png" alt="separator" sx={{ mx: 2, height: 21 }} />
                <Text variant="RalewayTitle" sx={{ color: "Blue_2" }}>{item?.district?.title}</Text>
                <img src="images/Line.png" alt="separator" sx={{ mx: 2, height: 21 }} />
                <Text variant="RalewayTitle" sx={{ color: "Blue_2" }}>{item?.block?.title}</Text>
            </div>

            <div>
                <Text variant="RalewayTitle" sx={{ color: "orange", }}>{appTranslations?.CARD_AVAILABLE_FACILITIES}</Text>
            </div>
            <div sx={{ mb: 3, flexWrap: 'wrap' }}>
                {healthFacilitiesList(item)?.map((data, i) => {
                    return (
                        <>
                            <Text variant="RalewayTitle" sx={{ color: "Blue_2" }}>{facilityName?.[data]}</Text>
                            {healthFacilitiesList(item).length - 1 !== i && (
                                <img src="images/Line.png" alt="separator" sx={{ mx: 2, height: 21 }} />
                            )}
                        </>
                    )
                })}
            </div>
            <a style={{ cursor: 'pointer', textDecorationLine: 'none' }}
                href={url} target='_blank'
            >
                <Flex sx={{ justifyContent: 'flex-end' }}>
                    <Flex sx={{ backgroundColor: "Card_Gradian", py: "2px", alignItems: 'center' }} className="px-2 rounded-pill">
                        <img src="images/directions.png" alt="get-direction" sx={{ mr: "5px", width: 18, height: 18 }} />
                        <Text variant="RalewayTitle" sx={{ color: 'white' }}>Direction</Text>
                    </Flex>
                </Flex>
            </a>
        </Box>
    )
}

export default ReferralHealthFacilityCard;