/** @jsxImportSource theme-ui */
import { BASE_URL } from '@tb-frontend/shared/globles';
import { getAllCertificates } from '@tb-frontend/shared/Store/action/leaderBoardAction';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container, Flex, Heading } from 'theme-ui';
import CertificateCard from '../../components/CertificateCard';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
const Certificates = () => {
  const token = Cookies.get('token')
  const history = useHistory();
  const { allCertificates, loader } = useSelector(state => state?.leaderBoard);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const dispatch = useDispatch();
  const queryObj = queryString?.parse(history.location.search)
  useEffect(() => {
    dispatch(getAllCertificates());
  }, []);


  const onButtonClick = async () => {
    try {
      fetch(BASE_URL + 'get-certificate-pdf/' + queryObj?.id, { headers: { Authorization: 'Bearer ' + token } }).then(
        response => {
          response.blob().then(blob => {
            const fileURL = window.URL.createObjectURL(blob);
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = queryObj?.name + '.pdf';
            alink.click();
          })
        })
    } catch (error) {
      console.log("onButtonClick error", error);
    }
  }
  return (
    <>
      <section sx={{ variant: 'layout.Home' }}>
        <Container sx={{ mt: 50 }}>
          <Heading variant="Raleway18" sx={{ color: "black2", mb: 58 }}>{appTranslations?.TITLE_CERTIFICATES}</Heading>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="row certificate-list">
                {allCertificates?.map((item, i) => {
                  return (
                    <CertificateCard
                      backgroundColor={queryObj?.id == item?.assessment_id ? "Blue_2" : "white"}
                      textColor={queryObj?.id == item?.assessment_id ? "white" : "Blue_2"}
                      onClick={() => {
                        history.replace("./Certificates?id=" + item?.assessment_id + "&name=" + item?.assessment_with_trashed?.assessment_title)
                      }}
                      key={'Assessment List -' + item?.assessment_id}
                      title={item?.assessment_with_trashed?.assessment_title}
                    />

                  );
                })}
              </div>
            </div>
            <div className="col-lg-8">
              {queryObj?.id ?

                <Document
                  file={{
                    url: BASE_URL + 'get-certificate-pdf/' + queryObj?.id,
                    httpHeaders: {
                      Authorization: 'Bearer ' + token,
                    },
                  }}
                  onLoadSuccess={({ numPages }) => console.log("onLoadSuccess", numPages)}
                  onLoadError={(e) => console.log("error >", e)} >
                  <Page size="A4" pageNumber={1} pageIndex={1}>
                    {/* <View >
                      <Text>Section #1</Text>
                    </View> */}
                  </Page>
                </Document>

                :
                <Flex variant="PreviewBox" sx={{ justifyContent: 'center', alignItems: 'center', maxWidth: 645, height: 456 }} className="mx-auto">
                  <Heading variant="Raleway18" sx={{ color: "Grey_4" }} className="">Preview</Heading>
                </Flex>
              }
              <Flex sx={{ justifyContent: 'center', mt: 65 }}>
                <Button
                  px={34} py={3} sx={{}}
                  backgroundColor="Blue_2" color="white"
                  className="btn" onClick={onButtonClick}
                  disabled={queryObj?.id ? false : true}><Heading variant="Raleway18" >{appTranslations?.DOWNLOAD}</Heading></Button>
              </Flex>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
export default Certificates;