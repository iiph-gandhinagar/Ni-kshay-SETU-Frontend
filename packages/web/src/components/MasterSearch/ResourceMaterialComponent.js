/** @jsxImportSource theme-ui */
import { getRMMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import { debounce } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getImage, getMaterialsLink } from '../../utils/functions';
import MasterSearchCard from '../MasterSearchCard';
import NoResultFound from '../NoResultFound';
const ResourceMaterialComponent = ({ search }) => {
  const { rmData, rmLoader } = useSelector(state => state?.masterSearch);
  const history = useHistory()
  const dispatch = useDispatch();
  const searchHandler = useCallback(debounce(search => {
    dispatch(getRMMasterSearch(search))
  }, 800), []);
  useEffect(() => {
    if (search !== '') {
      searchHandler(search)
    }
  }, [search]);
  return (
    <>
      {rmLoader ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <div sx={{ maxHeight: "100vh", overflowY: 'auto' }}>
          {rmData?.map((item, i) => {
            return (
              <a
                href={getMaterialsLink(item.type_of_materials, item, item?.parent_id)}
                target={item.type_of_materials == 'folder' ? null : "_blank"} className="text-decoration-none">
                <MasterSearchCard
                  name={item.title}
                  key={i}
                  source={getImage(item?.type_of_materials, item?.icon, null)}
                />
              </a>
            );
          })}
          {
            rmLoader ?
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              : search !== '' ? <NoResultFound />
                : ""}
        </div>
      }
    </>
  );
}
export default ResourceMaterialComponent;