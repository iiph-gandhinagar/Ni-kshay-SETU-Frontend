/** @jsxImportSource theme-ui */
import { getModuleMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import { debounce } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getImage } from '../../utils/functions';
import MasterSearchCard from '../MasterSearchCard';
import NoResultFound from '../NoResultFound';
const ModulesComponent = ({ search }) => {
  const history = useHistory()
  const { moduleData, moduleLoader } = useSelector(state => state?.masterSearch);
  const dispatch = useDispatch();
  const searchHandler = useCallback(debounce(search => {
    dispatch(getModuleMasterSearch(search))
  }, 800), []);
  useEffect(() => {
    if (search !== '') {
      searchHandler(search)
    }
  }, [search]);
  return (
    <>
      {moduleLoader ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <div sx={{ maxHeight: "100vh", overflowY: 'auto' }}>
          {moduleData?.map((item, i) => {
            return (
              <MasterSearchCard
                name={item.title}
                key={i}
                source={getImage(item?.type, item?.icon, item?.imageUrl)}
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
              />
            );
          })}
          {
            moduleLoader ?
              null
              : search !== '' ? <NoResultFound />
                : ""}
        </div>
      }
    </>
  );
}
export default ModulesComponent;