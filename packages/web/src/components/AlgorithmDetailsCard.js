/** @jsxImportSource theme-ui */
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { AlgorithmFlow } from '@tb-frontend/shared/Store/action/algorithmAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Flex, Heading, Label, Radio } from 'theme-ui';
import CertificateModal from './Modals/CertificateModal';
import CMSModal from './Modals/CMSModal';
export const AlgorithmDetailsCardExpandable = ({ item, algorithmFlow, queryString, openBydefault, isSelect, is_expandable, onSelect }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [CMSModalTitle, setCMSModalTitle] = useState('');
    const [isLastModal, setLastModal] = useState(false);
    const [onLastModalClose, setLastModalclose] = useState({
        isLastModal: false,
    });
    const history = useHistory();
    const dispatch = useDispatch()
    const onClick = (masterobj, selfobj, dependent) => {
        if (selfobj.node_type === "Linking Node") {
            const NewArray = algorithmFlow;
            if (NewArray?.length == 0) {
                NewArray.push(masterobj);
                NewArray.push(selfobj);
            }
            NewArray.push(dependent[0]);
            dispatch(AlgorithmFlow([...NewArray]));
            history.push(`/AlgorithmList/AlgorithmDetails/AlgorithmScreen${queryString}`)
        }
    }
    const closeModal = () => {
        setModalVisible(false);
        if (item?.header !== '' && item?.sub_header !== '') {
            setLastModal(true);
            setLastModalclose({ isLastModal: false });
        }
    };
    useEffect(() => {
        if (openBydefault) {
            if ((item?.node_type === 'CMS Node' || item?.node_type === 'CMS Node(New Page)') && item?.description) {
                setModalVisible(true);
                setHtmlContent(item?.description);
                setCMSModalTitle(item?.title);
            } else if (
                item?.is_expandable === 1 &&
                item?.node_type === 'Linking Node'
            ) {
                // toggleExpand();
            }
        }
    }, [openBydefault]);
    return (
        <div>
            <Box
                key={item?.id}
                variant="AlgorithmDetailsCard"
                onClick={() => {
                    onSelect()
                    if (item?.node_type === 'CMS Node' || item?.node_type === 'CMS Node(New Page)') {
                        setModalVisible(true);
                        setHtmlContent(item?.description);
                        setCMSModalTitle(item?.title);
                    } else if (item?.node_type === 'Linking Node Without Options') {
                        history.push('/AlgorithmList/AlgorithmDetails/Algorithm', item)

                    }
                }}
                sx={{ textAlign: "left", }}
                className={`pointer ${is_expandable ? `accordion-button ${isSelect ? "" : "collapsed"}` : ""}`}
                style={{ cursor: item?.node_type !== 'Linking Node' ? 'pointer' : null }}
            >
                {item?.media?.[0]?.file_name &&
                    <img src={`${BASE_MEDIA_URL +
                        item?.media?.[0]?.id +
                        '/' +
                        item?.media?.[0]?.file_name
                        }`} alt="logo" sx={{ height: 64, width: 64, textAlign: "center", marginBottom: 4, mr: 2 }} />}
                <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Heading variant="Nunito18title" sx={{ color: "black2" }}>{item?.title}</Heading>
                </Flex>
            </Box>

            {is_expandable ?
                <div className={`collapse ${isSelect ? "show" : ""}`}
                    id={"collapseExample" + item?.id}
                    sx={{ variant: "CollapseBox", mt: 15 }}>
                    <Box variant="CollapseBoxHeader">
                        <Heading variant="Nunito12" sx={{ color: "black2", }}>Select any one result</Heading>
                    </Box>
                    <Box sx={{ p: 12, pt: 2 }} className="algorithm-details-card">
                        {item?.node_type !== 'Linking Node Without Options' && item?.children?.map((data) => {
                            return (
                                <Flex style={{ cursor: 'pointer', alignItems: 'center' }} className="options" onClick={() => {

                                    if (data?.node_type === "Linking Node") {
                                        onClick(item, data, data.children)
                                    } else if (data?.node_type === 'CMS Node' || data?.node_type === 'CMS Node(New Page)') {
                                        setModalVisible(true);
                                        setHtmlContent(data.description);
                                        setCMSModalTitle(data?.title);
                                    }
                                }} key={data.id} sx={{ mb: 4 }}>
                                    <Label style={{ alignItems: 'center' }} className="pointer">
                                        <Radio
                                            name='dark-mode'
                                            value='true'
                                            className="custom-radio"
                                        />
                                        {/* <img src={'../../arrow-right.svg'} alt="Notselected" sx={{ mr: 2 }} /> */}
                                        <Heading variant="Nunito16" sx={{ color: "black2", }}>{data.title}</Heading>
                                    </Label>
                                </Flex>
                            )
                        })}

                    </Box>
                </div> : null}
            {isModalVisible && (
                <CMSModal
                    isModalVisible={isModalVisible}
                    closeModal={closeModal}
                    htmlContent={htmlContent}
                    CMSModalTitle={CMSModalTitle}
                />
            )}
        </div>
    );
}
export const AlgorithmDetailsCard = ({ item, algorithmFlow, queryString, openBydefault, algoTitle }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [CMSModalTitle, setCMSModalTitle] = useState('');
    const [isLastModal, setLastModal] = useState(false);
    const [onLastModalClose, setLastModalclose] = useState({
        isLastModal: false,
    });
    const history = useHistory();

    const dispatch = useDispatch()
    const onClick = (masterobj, selfobj, dependent) => {
        if (selfobj.node_type === "Linking Node") {
            const NewArray = algorithmFlow;
            if (NewArray?.length == 0) {
                NewArray.push(masterobj);
                NewArray.push(selfobj);
            }
            NewArray.push(dependent[0]);
            dispatch(AlgorithmFlow([...NewArray]));
            history.push(`/AlgorithmList/AlgorithmDetails/AlgorithmScreen${queryString}`)
        }
    }
    const closeModal = () => {
        setModalVisible(false);
        if (item?.header !== '' && item?.sub_header !== '') {
            setLastModal(true);
            setLastModalclose({ isLastModal: false });
        }
    };
    useEffect(() => {
        if (openBydefault) {
            if ((item?.node_type === 'CMS Node' || item?.node_type === 'CMS Node(New Page)') && item?.description) {
                setModalVisible(true);
                setHtmlContent(item?.description);
                setCMSModalTitle(item?.title);
            } else if (
                item?.is_expandable === 1 &&
                item?.node_type === 'Linking Node'
            ) {
                // toggleExpand();
            }
        }
    }, [openBydefault]);
    return (
        <Box key={item?.id} variant="AlgorithmDetailsCard" sx={{ textAlign: "left", }}>
            {item?.media?.[0]?.file_name &&
                <img src={`${BASE_MEDIA_URL +
                    item?.media?.[0]?.id +
                    '/' +
                    item?.media?.[0]?.file_name
                    }`} alt="logo" sx={{ height: 64, width: 64, textAlign: "center", marginBottom: 4, }} />}
            <Heading style={{ cursor: item?.node_type !== 'Linking Node' ? 'pointer' : null }} onClick={() => {
                if (item?.node_type === "CMS Node") {
                    setModalVisible(true);
                    setHtmlContent(item?.description);
                    setCMSModalTitle(item?.title);
                } else if (item?.node_type === 'Linking Node Without Options') {
                    history.push('/AlgorithmList/AlgorithmDetails/Algorithm', item)

                }
            }} variant="Nunito18title" sx={{ color: "black2" }}>{item?.title}</Heading>

            <div>
                {item?.node_type !== 'Linking Node Without Options' && item?.children?.map((data) => {
                    return (
                        <Flex style={{ cursor: 'pointer' }} onClick={() => {

                            if (data?.node_type === "Linking Node") {
                                onClick(item, data, data.children)
                            } else if (data?.node_type === 'CMS Node' || data?.node_type === 'CMS Node(New Page)') {
                                setModalVisible(true);
                                setHtmlContent(data.description);
                                setCMSModalTitle(data?.title);
                            }
                        }} key={data.id} sx={{ mb: 3 }}>
                            <img src={'../../arrow-right.svg'} alt="Notselected" sx={{ mr: 2 }} />
                            <Heading as='h6' sx={{ variant: "HomeCardText", fontWeight: 'body', color: "colorDark3", }}>{data.title}</Heading>
                        </Flex>
                    )
                })}

            </div>
            {isModalVisible && (
                <CMSModal
                    isModalVisible={isModalVisible}
                    closeModal={closeModal}
                    htmlContent={htmlContent}
                    CMSModalTitle={CMSModalTitle}
                />
            )}
        </Box>
    );
}
export const AlgorithmCardWidthRightArrow = ({ queryString, item, algorithmFlow, appTranslations, algoTitle }) => {
    const history = useHistory();
    const [isModalVisible, setModalVisible] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [CMSModalTitle, setCMSModalTitle] = useState('');
    const [isLastModal, setLastModal] = useState(false);
    const [onLastModalClose, setLastModalclose] = useState({
        isLastModal: false,
    });
    const dispatch = useDispatch()
    const pushToArray = (array, id, PId, obj) => {
        const index = array.findIndex(e => e?.id === id || e.parent_id === PId);
        if (index === -1) {
            array.push(obj);
        } else {
            array?.splice(index);
            if (array[index]) {
                array[index] = obj;
            } else {
                array.push(obj);
            }
        }
        return array;
    };
    const onClick = (selfobj, dependent) => {
        slide()
        const selfobjAdd = pushToArray(
            algorithmFlow,
            selfobj.id,
            selfobj?.parent_id,
            selfobj,
        );
        const NewArray = pushToArray(
            selfobjAdd,
            dependent[0]?.id,
            dependent[0]?.parent_id,
            dependent[0],
        );
        dispatch(AlgorithmFlow([...NewArray]));

    };
    const slide = (direction) => {
        var container = document.getElementById('container');
        var scrollCompleted = 0;
        var slideVar = setInterval(function () {
            // if(direction == 'left'){
            //     container.scrollLeft -= 10;
            // } else {
            container.scrollLeft += 70;
            // }
            scrollCompleted += 10;
            if (scrollCompleted >= 100) {
                window.clearInterval(slideVar);
            }
        }, 50);
    }
    const closeModal = () => {
        setModalVisible(false);
    };
    return (
        <div style={{ alignSelf: "center", maxWidth: '400px' }}>
            <Box
                onClick={() => {
                    if ((item?.node_type === 'CMS Node' || item?.node_type === 'CMS Node(New Page)') && item?.description) {
                        setModalVisible(true);
                        setHtmlContent(item?.description);
                        setCMSModalTitle(item?.title);
                    } else if (
                        (item?.node_type === 'CMS Node' || item?.node_type === 'CMS Node(New Page)') &&
                        item?.redirect_algo_type !== null) {
                        if (item?.redirect_node_id !== 0) {
                            if (item?.header !== '' && item?.sub_header !== '') {

                            } else {
                                history.push(`/AlgorithmList/AlgorithmDetails?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=TITLE_TREATMENT_ALGORITHM&&type=${item?.redirect_algo_type}&&id=${item?.redirect_node_id}&&sid=${queryString.sid}&&link=${queryString.link}`)
                            }
                        } else {
                            if (item?.header !== '' && item?.sub_header !== '') {
                                setLastModal(true);
                                setLastModalclose({
                                    isLastModal: false,
                                    path: `/AlgorithmList?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=TITLE_TREATMENT_ALGORITHM&&type=${item?.redirect_algo_type}&&sid=${queryString.sid}&&link=${queryString.link}`
                                });
                            }
                            else {
                                history.push(`/AlgorithmList?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=TITLE_TREATMENT_ALGORITHM&&type=${item?.redirect_algo_type}&&sid=${queryString.sid}&&link=${queryString.link}`)
                            }
                        }
                    }
                }}
                style={{
                    alignSelf: "center",
                    cursor: item?.node_type !== 'Linking Node' ?
                        (item?.redirect_algo_type !== null || item?.description) ?
                            'pointer' : null : null
                }} key={item?.id} variant="AlgorithmDetailsCard" sx={{ textAlign: "left", }}>
                {item?.media?.[0]?.file_name &&
                    <img src={`${BASE_MEDIA_URL +
                        item?.media?.[0]?.id +
                        '/' +
                        item?.media?.[0]?.file_name
                        }`} alt="logo" sx={{ height: 64, width: 64, textAlign: "center", marginBottom: 4, }} />}
                <Heading
                    variant="Nunito18title" sx={{ color: "black2" }}>
                    {item?.title}
                </Heading>

            </Box >
            {item.is_expandable === 1 ?
                <div sx={{ variant: "CollapseBox", my: 15 }}>
                    <Box variant="CollapseBoxHeader">
                        <Heading variant="Nunito12" sx={{ color: "black2", }}>Select any one result</Heading>
                    </Box>
                    <Box as='form' sx={{ p: 12, pt: 2 }} className="algorithm-details-card">
                        {item?.children?.map((data) => {
                            return (
                                <Flex style={{ cursor: 'pointer' }} onClick={() => {
                                    if ((data?.node_type === 'CMS Node' || data?.node_type === 'CMS Node(New Page)') &&
                                        data?.redirect_algo_type !== null) {
                                        if (data?.redirect_node_id !== 0) {
                                            history.push(`/AlgorithmList/AlgorithmDetails?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=TITLE_TREATMENT_ALGORITHM&&type=${data.redirect_algo_type}&&id=${data.redirect_node_id}&&sid=${queryString.sid}&&link=${queryString.link}`)
                                        } else {
                                            history.push(`/AlgorithmList?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=TITLE_TREATMENT_ALGORITHM&&type=${data.redirect_algo_type}&&sid=${queryString.sid}&&link=${queryString.link}`)
                                        }
                                    }
                                    else if (
                                        (data?.node_type === 'CMS Node' || data?.node_type === 'CMS Node(New Page)') &&
                                        data.description
                                    ) {
                                        setModalVisible(true);
                                        setHtmlContent(data?.description);
                                        setCMSModalTitle(data?.title);
                                    } else if (
                                        data.is_expandable === 1 ||
                                        data.has_options === 1 ||
                                        data?.children?.length > 0
                                    ) {
                                        onClick(data, data.children);
                                    }

                                }} key={data.id} sx={{ mb: 3 }}>
                                    <Label style={{ alignItems: 'center' }} className="pointer">
                                        <Radio
                                            className="custom-radio"
                                            value={"true"}
                                            checked={algorithmFlow?.findIndex(e => e?.title == data?.title && e.id === data?.id) !== -1}
                                            name={data.title}
                                        />
                                        <Heading variant="Nunito16" sx={{ color: "black2", }}>{data.title}</Heading>
                                    </Label>
                                </Flex>
                            )
                        })}
                    </Box>

                </div> : ""}
            {isModalVisible && (
                <CMSModal
                    isModalVisible={isModalVisible}
                    closeModal={closeModal}
                    htmlContent={htmlContent}
                    CMSModalTitle={CMSModalTitle}
                />
            )}
            {/* </Box > */}
        </div>
    );
}
export const AlgorithmNameCard = ({ title }) => {

    return (
        <>
            <Flex style={{ justifyContent: "center" }} >
                <img src={"../../../images/arrow-right.png"} alt="Notselected" sx={{ alignSelf: 'center', transform: ["rotate(90deg)", null, null, "rotate(0deg)"], width: 30 }} />
            </Flex>
            <Heading variant="Nunito16" style={{ alignSelf: 'center', margin: 0, maxWidth: '200px' }} sx={{ color: "Blue_2", textAlign: 'center', verticalAlign: "center", }} className="">{title}</Heading>
            <Flex style={{ justifyContent: "center" }} >
                <img src={"../../../images/arrow-right.png"} alt="Notselected" sx={{ alignSelf: 'center', transform: ["rotate(90deg)", null, null, "rotate(0deg)"], width: 30 }} />
            </Flex>
        </>
    );
}