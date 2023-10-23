/** @jsxImportSource theme-ui */
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { getSubModuleMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CMSModal from '../../components/Modals/CMSModal';
import MasterSearchCard from '../MasterSearchCard';
import NoResultFound from '../NoResultFound';
const SubModulesComponent = ({ search }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [CMSModalTitle, setCMSModalTitle] = useState('');
  const { subModuleData, subModuleLoader } = useSelector(state => state?.masterSearch);
  const history = useHistory()
  const dispatch = useDispatch();
  const searchHandler = useCallback(debounce(search => {
    dispatch(getSubModuleMasterSearch(search))
  }, 800), []);
  useEffect(() => {
    if (search !== '') {
      searchHandler(search)
    }
  }, [search]);
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
      {subModuleLoader ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <div sx={{ maxHeight: "100vh", overflowY: 'auto' }}>
          {subModuleData?.map((item, i) => {
            return (
              <MasterSearchCard
                name={item.title}
                key={i}
                source={BASE_MEDIA_URL + item?.media}
                onClick={() => {
                  if (item?.node_type == 'App Screen Node') {
                    history.push(`/LaboratoryInvestigation?name=${item?.title}${item.type ? '&&type=' + item.type : ''}&&link=${item?.link}${item.id ? '&&id=' + item.id : ''}`)
                  } else if (
                    item?.node_type === 'CMS Node' &&
                    item?.description
                  ) {
                    ShowModal(item)
                  } else if (
                    item?.node_type === 'CMS Node(New Page)' &&
                    item?.description
                  ) {
                    ShowModal(item)
                  }
                  else if (item.node_type === "Linking Node") {
                    history.push(`/AlgorithmList/AlgorithmDetails?&&name=${item.title}&&type=${item.module}&&id=${item.id}&&pageTitle=${item.title}&&link=${item.link}${item.algo_Id ? '&&algo_Id=' + item.algo_Id : ''}`)
                  }
                }
                }
              />
            );
          })}
          {
            subModuleLoader ?
              null
              : search !== '' ? <NoResultFound />
                : null}
        </div>
      }

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
export default SubModulesComponent;