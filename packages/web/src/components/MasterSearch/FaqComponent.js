/** @jsxImportSource theme-ui */
import { getFaqMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getImage } from '../../utils/functions';
import MasterSearchCard from '../MasterSearchCard';
import CMSModal from '../Modals/CMSModal';
import NoResultFound from '../NoResultFound';
const FaqComponent = ({ search }) => {
  const [Modal, setModal] = useState({
    isModalVisible: false,
    htmlContent: "",
    CMSModalTitle: ""
  });
  const { faqData, faqLoader } = useSelector(state => state?.masterSearch);
  const history = useHistory()
  const dispatch = useDispatch();
  const closeModal = () => {
    setModal({
      isModalVisible: false,
      htmlContent: "",
      CMSModalTitle: ""
    });
  };
  const searchHandler = useCallback(debounce(search => {
    dispatch(getFaqMasterSearch(search));
  }, 800), []);
  useEffect(() => {
    if (search !== '') {
      searchHandler(search)
    }
  }, [search]);
  return (
    <>
      {faqLoader ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <div sx={{ maxHeight: "100vh", overflowY: 'auto' }}>
          {faqData?.map((item, i) => {
            return (
              <MasterSearchCard
                onClick={() => {
                  console.log("item?.id", item?.id);
                  setModal({
                    isModalVisible: true,
                    htmlContent: item.answer,
                    CMSModalTitle: item.question
                  })
                  // item.answer
                }}
                name={item.question}
                key={i}
                source={getImage(item?.type, item?.icon, item?.imageUrl)}
              />
            );
          })}
          {
            faqLoader ?
              null
              : search !== '' ? <NoResultFound />
                : ""}
        </div>
      }
      {Modal.isModalVisible && (
        <CMSModal
          isModalVisible={Modal.isModalVisible}
          closeModal={closeModal}
          htmlContent={Modal.htmlContent}
          CMSModalTitle={Modal.CMSModalTitle}
        />
      )}
    </>
  );
}
export default FaqComponent;