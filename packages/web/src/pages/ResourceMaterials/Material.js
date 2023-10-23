/** @jsxImportSource theme-ui */
import { clearMaterials, getMaterials } from '@tb-frontend/shared/Store/action/materialsAction';
import { storeUserActivity } from '@tb-frontend/shared/Store/action/appActions';
import moment from 'moment';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Heading } from 'theme-ui';
import { getImage, getMaterialsLink } from '../../utils/functions';
import TitleTag from '../../components/TitleTag';

const Material = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { appTranslations, dynamicAlogs, loader } = useSelector(state => state?.app);
    const queryObj = queryString?.parse(history.location?.search)
    const [filterData, setfilterData] = useState([]);
    const [filterName, setFilterName] = useState('name');
    const [masterData, setmasterData] = useState([]);
    const { materialsList } = useSelector(state => state?.materials);

    const getMaterialsSize = (status, item) => {
        if (status === 'videos') {
            let videoSize = item?.media.filter(
                e => e.mime_type === 'video/mp4' || e.mime_type === 'video/x-m4v' || e.mime_type === 'video/WMV' || e.mime_type === 'video/MOV' || e.mime_type === 'video/m4a' | e.mime_type === 'video/m4v')
            return bytesToSize(videoSize[0]?.size)
        }
        if (status === 'ppt') {
            let pptSize = item?.media.filter(
                e => e.mime_type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
            return bytesToSize(pptSize[0]?.size)
        }
        if (status === 'document') {
            let documentSize = item?.media.filter(
                e => e.mime_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            return bytesToSize(documentSize[0]?.size)
        }
        if (status === 'images') {
            let othersSize = item?.media.filter(
                e => e.mime_type === 'image/jpeg' || e.mime_type === 'image/png' || e.mime_type === 'image/jpg')
            return bytesToSize(othersSize[0]?.size)
        }
        if (status === 'pdfs' || status === 'pdf_office_orders') {
            let pdfSize = item?.media.filter(
                e => e.mime_type === 'application/pdf',
            )
            return bytesToSize(pdfSize[0]?.size)
        }
        return null;
    }

    const bytesToSize = (bytes, decimals = 2) => {
        if (!bytes) return '0 Bytes'
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    useEffect(() => {
        let isMounted = true;
        const unsubscribe = async () => {
            if (queryObj.type) {
                var obj = {
                    type: queryObj?.type,
                    filter: filterName
                };
                dispatch(getMaterials(obj));
            }
        };
        if (isMounted) {
            unsubscribe();
        }
        return function cleanup() {
            isMounted = false;
            dispatch(clearMaterials());
        };
    }, [queryObj?.type, filterName]);
    useEffect(() => {
        if (materialsList) {
            setfilterData(materialsList);
            setmasterData(materialsList);
        }
    }, [materialsList]);
    return (
        <>
            <TitleTag title={appTranslations[queryObj.name] || queryObj.name} />
            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    <Heading sx={{ mb: 4, pt: 8 }} variant="Raleway18">{appTranslations[queryObj.name] || queryObj.name}</Heading>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">{appTranslations?.TABLE_NAME}</th>
                                    <th scope="col"><span className="border-start" sx={{ pl: "12px" }}>{appTranslations?.TABLE_SIZE}</span></th>
                                    <th scope="col"><span className="border-start" sx={{ pl: "12px" }}>{appTranslations?.TABLE_UPLOAD_DATE}</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loader ?
                                    null
                                    : filterData.length > 0 && filterData?.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                {/* <th scope="row">1</th> */}
                                                <td className="ps-0">
                                                    <img style={{ width: 32 }} src={getImage(item.type_of_materials, null, null)}
                                                        alt={item.type_of_materials} sx={{ mr: 2 }} />
                                                    <a
                                                        onClick={() => {
                                                            if (item.type_of_materials !== "folder")
                                                                dispatch(storeUserActivity("Open_Resource_Materials"))
                                                        }}
                                                        href={getMaterialsLink(item.type_of_materials, item, queryObj?.parent_id)}
                                                        target={item.type_of_materials == 'folder' ? null : "_blank"} className="materials-link">
                                                        {item.title}
                                                    </a>
                                                </td>
                                                <td>{getMaterialsSize(item.type_of_materials, item)}</td>
                                                <td>{moment(item.created_at).format('DD MMMM YYYY [at] hh:mm A')}</td>
                                            </tr>

                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </Container>
            </section>
        </>
    );
}
export default Material;