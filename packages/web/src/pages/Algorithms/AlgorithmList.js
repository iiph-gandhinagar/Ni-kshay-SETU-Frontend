/** @jsxImportSource theme-ui */
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import {
  cleanAlgorithmFlow,
  clearAlgorithmsMasterNode, getAlgorithmsMasterNode, getDynamicAlgorithmsMasterNode
} from '@tb-frontend/shared/Store/action/algorithmAction';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Box, Container, Flex, Grid, Heading, Themed } from 'theme-ui';
import CMSModal from '../../components/Modals/CMSModal';
import TitleTag from '../../components/TitleTag';
const AlgorithmList = (props) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [CMSModalTitle, setCMSModalTitle] = useState('');
  const List = useSelector(state => state?.algorithm?.algorithmMasterNodes);
  const { appTranslations } = useSelector(state => state?.app);
  const queryObj = queryString?.parse(props.location?.search)
  console.log("AlgorithmList ", queryObj);
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = async () => {
      if (isMounted && queryObj?.type !== 'Dynamic') {
        dispatch(getAlgorithmsMasterNode(queryObj.type));
      } else if (isMounted && queryObj?.type == 'Dynamic') {
        dispatch(getDynamicAlgorithmsMasterNode(queryObj.algo_Id));
      }
    };

    if (isMounted) {
      unsubscribe();
      dispatch(cleanAlgorithmFlow());
    }
    return function cleanup() {
      isMounted = false;
      console.log('cleanup');
      dispatch(clearAlgorithmsMasterNode());
      unsubscribe();
    };
  }, [queryObj?.type]);
  const closeModal = () => {
    setModalVisible(false);
  };

  const ShowModal = (item) => {
    setModalVisible(true);
    setHtmlContent(item.description);
    setCMSModalTitle(item?.title);
  };
  return (
    <>
      <TitleTag title={queryObj.name} />
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          <Heading sx={{ mb: 4, pt: 8 }} variant="Raleway18">{appTranslations[queryObj.name]}</Heading>
          <Grid gap={9} columns={[2, null, 3, 4, 5]} sx={{ pt: 8 }}>
            {List && List.map((item, i) => {
              if (item.node_type === "App Screen Node") {
                return (
                  <NavLink to={{
                    pathname: `/LaboratoryInvestigation`,
                    search: `?section=${queryObj.section}&&name=${queryObj.name}&&type=${queryObj.type}&&id=${item.id}&&pageTitle=${item.title}&&sid=${queryObj.sid}&&link=${queryObj.link}`,
                  }} key={i} className="text-decoration-none">
                    <Box variant="AlgorithmListCard" className="pb-1">
                      <Box variant="AlgorithmListCardImage" className="rounded-circle p-2 d-flex justify-content-center align-items-center">
                        <img src={`${item?.media?.[0]?.file_name
                          ? BASE_MEDIA_URL +
                          item?.media?.[0]?.id +
                          '/' +
                          item?.media?.[0]?.file_name
                          : false}`} alt="logo" sx={{ height: 40, width: 40 }} />
                      </Box>
                      <Heading variant="Nunito18title" className="mt-1" sx={{ color: "Blue_Theme" }}>{item.title}</Heading>
                    </Box>
                  </NavLink>)
              }
              else if (item.node_type === "Linking Node") {
                return (
                  <NavLink to={{
                    pathname: `/AlgorithmList/AlgorithmDetails`,
                    search: `?&&name=${queryObj.name}&&type=${queryObj.type}&&id=${item.id}&&pageTitle=${item.title}&&link=${queryObj.link}${queryObj.algo_Id ? '&&algo_Id=' + queryObj.algo_Id : ''}`,
                  }} key={i} className="text-decoration-none">
                    <Box variant="AlgorithmListCard" sx={{}} className="pb-1">
                      <Box variant="AlgorithmListCardImage" className="rounded-circle d-flex justify-content-center align-items-center">
                        <img src={`${item?.media?.[0]?.file_name
                          ? BASE_MEDIA_URL +
                          item?.media?.[0]?.id +
                          '/' +
                          item?.media?.[0]?.file_name
                          : false}`} alt="logo" sx={{ height: 40, width: 40, }} />
                      </Box>
                      <Heading variant="Nunito18title" className="mt-1" sx={{ color: "Blue_Theme" }}>{item.title}</Heading>
                    </Box>
                  </NavLink>
                )
              }
              else {
                return (
                  <Box onClick={() => {
                    if ((item?.node_type === 'CMS Node' || item?.node_type === 'CMS Node(New Page)') && item.description) {
                      ShowModal(item)
                    }
                  }} key={i} variant="AlgorithmListCard" sx={{}} className="pb-1 pointer" >
                    <Box variant="AlgorithmListCardImage" className="rounded-circle p-2 d-flex justify-content-center align-items-center">
                      <img src={`${item?.media?.[0]?.file_name
                        ? BASE_MEDIA_URL +
                        item?.media?.[0]?.id +
                        '/' +
                        item?.media?.[0]?.file_name
                        : false}`} alt="logo" sx={{ height: 40, width: 40, }} />
                    </Box>
                    <Heading variant="Nunito18title" className="mt-1" sx={{ color: "Blue_Theme" }}>{item.title}</Heading>
                  </Box>
                )
              }
            })}
          </Grid>
        </Container>
      </section>

      {isModalVisible && (
        <CMSModal
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          htmlContent={htmlContent}
          CMSModalTitle={CMSModalTitle}
        />
      )}
    </>
  );
}
export default AlgorithmList; 