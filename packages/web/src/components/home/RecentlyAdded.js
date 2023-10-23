/** @jsxImportSource theme-ui */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel3';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Heading, Text, Flex } from 'theme-ui';
import { getImage, getMaterialsUrl } from '../../utils/functions';
const RecentlyAdded = (props) => {
  const history = useHistory()
  const { recentlyAdded } = useSelector(state => state?.app);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  return (
    <div className="home-page-section" >
      <hr sx={{ variant: "hr" }} />
      <div className="section-title">
        <Heading sx={{ mb: 4, fontSize: [2, 3], color: "colorDark1" }} variant="Raleway18">{appTranslations?.RECENTLY_ADDED}</Heading>
      </div>
      <div className="recentlyadded-slides">
        <div className="row justify-content-center">
          {recentlyAdded?.map((item, i) => {
            const url = item?.media?.[0]?.id ?
              item?.media?.[0]?.id + '/' + item?.media?.[0]?.file_name : undefined;
            return (
              <div
                key={"RecentlyAdded" + i}
                onClick={() => {
                  if (item?.type_of_materials) {
                    console.log("", getMaterialsUrl(item.media));
                    switch (item.type_of_materials) {
                      case 'folder':
                        history.push(`ResourceMaterials/Material?name=${item?.title || item?.name}&&type=${item.id}&&parent_id=${item.id}`)
                        break;
                      case 'videos':
                        window.open(getMaterialsUrl(item.media), "_blank");
                        break;
                      case 'pdfs':
                        window.open(getMaterialsUrl(item.media), "_blank");
                        break;
                      case 'pdf_office_orders':
                        window.open(getMaterialsUrl(item.media), "_blank");
                        break;
                      case 'ppt':
                        window.open(getMaterialsUrl(item.media), "_blank");
                        break;
                      case 'document':
                        window.open(getMaterialsUrl(item.media), "_blank");
                        break;
                      case 'images':
                        window.open(getMaterialsUrl(item.media), "_blank");
                        break;
                      default:
                        // console.log('', getMaterialsUrl(item.media));

                        break;
                    }
                  } else {
                    history.push(`/AlgorithmList?name=${item?.name}&&type=Dynamic${item.id ? '&&algo_Id=' + item.id : ''}`)
                  }
                }}

                className="col-12 mb-3 pointer">
                <div className="card h-100 recentlyadded-box border-0 p-2">
                  <Flex sx={{alignItems: 'center'}}>
                  <img src={getImage(item?.type_of_materials, item?.type_of_materials, url)} alt="img" className="img me-3" sx={{}} />

                  <div className="card-body p-0">
                    <div className="">
                      <Heading className="card-title" variant="Nunito18title" color="Blue_Theme" mb="3px">{item?.title || item?.name}</Heading>
                      <Flex sx={{justifyContent: 'space-between'}}>
                      <Text variant="Nunito12" color="HOVER_ORANGE">{item?.type_of_materials ? 'Resource Material' : 'Module'}</Text>
                    <Text variant="Nunito16" color="Grey_4">{moment(item?.created_at).fromNow()}</Text>
                  </Flex>
                    </div>
                  </div>
                  </Flex>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
}
export default RecentlyAdded;