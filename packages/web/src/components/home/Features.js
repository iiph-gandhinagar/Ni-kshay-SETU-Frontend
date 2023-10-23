/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Flex, Grid, Heading } from 'theme-ui';
const Features = (props) => {
  
  const [items, setItems] = React.useState([
    {
      name: 'F_CASE_FINDING',
      sectionKey: 'LEARN',
      code: '#B57031',
      ImgUrl: "../../images/CaseFinding.png"
    },
    {
      name: 'F_MANG_PATIENT',
      sectionKey: 'PMT',
      code: '#4277FF',
      ImgUrl: "../../images/ManageTB.png"
    },
    {
      name: 'F_RESO_MATERIAL',
      code: '#31B564',
      ImgUrl: "../../images/ResourceMaterial.png"
    },
    {
      name: 'F_REF_HEALTH_FACILITY',
      code: '#E1546F',
      ImgUrl: "../../images/Hospital.png"
    },
  ]);
  
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  
  const history = useHistory()
  return (
    <div className="home-page-section" >
      <hr sx={{ variant: "hr" }} />
      <div className="section-title">
        <Heading sx={{ mb: 4, fontSize: [2, 3], color: "colorDark1" }} variant="Raleway18">{appTranslations?.F_FEATURES}</Heading>
      </div>
      <Grid gap={56} columns={[1, 2, null, null, 3, 4]}>
        {items?.map((item, i) => {
          return (
            <div key={"Features" + i} onClick={() => {
              switch (item.name) {
                case 'F_RESO_MATERIAL':
                  history.push(`/ResourceMaterials`)
                  break;
                case 'F_MANG_PATIENT':
                  history.push(`/Algorithms?name=${item.name}&&sectionKey=${item.sectionKey}`)
                  break;
                case 'F_CASE_FINDING':
                  history.push(`/Algorithms?name=${item.name}&&sectionKey=${item.sectionKey}`)
                  break;
                case 'F_REF_HEALTH_FACILITY':
                  history.push("/SearchHealthFacility")
                  break;
                default:
                  break;
              }
            }}>
              <Box variant="Features">
                <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Heading as='h6' variant="Raleway18" sx={{ color: item.code }}>{appTranslations?.[item.name]}</Heading>
                  <img src={item.ImgUrl} alt="logo" sx={{ textAlign: "center", marginBottom: 3, height: 80 }} />
                </Flex>
              </Box>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}
export default Features;