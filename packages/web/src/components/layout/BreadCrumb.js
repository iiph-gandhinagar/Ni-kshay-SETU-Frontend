import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function BreadCrumbs({ queryObj, pageTitle }) {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <div className="page-title-area pt-3">
            <ul>
                <li>
                    <NavLink to="/">
                        {appTranslations.TAB_HOME}
                    </NavLink>
                </li>
                {(queryObj.section) &&
                    <>
                        <img src={"../../chevron-right.svg"} alt="chevron-right" sx={{ marginLeft: 1, marginRight: 1, }} />
                        <li>
                            <a href={"/#" + queryObj?.sid}>
                                {appTranslations[queryObj?.section]||queryObj?.section}
                            </a>
                        </li>
                    </>}
                {(queryObj?.name) &&
                    pageTitle || queryObj?.pageTitle ?
                    <>
                        <img src={"../../chevron-right.svg"} alt="chevron-right" sx={{ marginLeft: 1, marginRight: 1, }} />
                        <li>
                            <NavLink to={{
                                pathname: `/${queryObj.link}`,
                                search: `?section=${queryObj?.section}&&name=${queryObj.name}${queryObj.type ? '&&type=' + queryObj.type : ''}&&sid=${queryObj.sid}&&link=${queryObj.link}${queryObj?.algo_Id ? '&&algo_Id=' + queryObj.algo_Id : ''}`
                            }}>
                                {appTranslations[queryObj?.name]||queryObj?.name}
                            </NavLink>
                        </li>
                    </>
                    : queryObj?.hierarchy ?
                        <>
                            <img src={"../../chevron-right.svg"} alt="chevron-right" sx={{ marginLeft: 1, marginRight: 1, }} />
                            <li>
                                <NavLink
                                    onClick={() => console.log("NavLink" + `?section=${queryObj?.section}&&name=${queryObj.name}&&type=${queryObj?.parent_id}&&sid=${queryObj.sid}&&link=${queryObj.link}&&parent_id=${queryObj?.parent_id}`)}
                                    to={{
                                        pathname: `/${queryObj.link}`,
                                        search: `?section=${queryObj?.section}&&name=${queryObj.name}&&type=${queryObj?.parent_id}&&sid=${queryObj.sid}&&link=${queryObj.link}&&parent_id=${queryObj?.parent_id}${queryObj?.algo_Id ? '&&algo_Id=' + queryObj.algo_Id : ''}`
                                    }}>
                                    {queryObj?.name}
                                </NavLink>
                            </li>
                        </>
                        :
                        <>
                            <img src={"../../chevron-right.svg"} alt="chevron-right" sx={{ marginLeft: 1, marginRight: 1, }} />
                            <li>
                                {appTranslations[queryObj?.name]||queryObj?.name}
                            </li>
                        </>}
                {(pageTitle || queryObj?.pageTitle) &&
                    <>
                        <img src={"../../chevron-right.svg"} alt="chevron-right" sx={{ marginLeft: 1, marginRight: 1, }} />
                        <li>{pageTitle || queryObj?.pageTitle}</li>
                    </>
                }
                {queryObj?.hierarchy &&
                    queryObj?.hierarchy?.split('-').map((title, i) => {
                        const hierarchyArray = queryObj?.hierarchy?.split('-')
                        let text = ''
                        for (let index = 0; index < (i + 1); index++) {
                            let extre = (i != index) ? '-' : '';
                            text = text + hierarchyArray[index] + extre;

                        }
                        return (
                            <>
                                <img src={"../../chevron-right.svg"}
                                    alt="chevron-right"
                                    sx={{ marginLeft: 1, marginRight: 1, }} />
                                <li>
                                    {queryObj?.hierarchy?.split('-').length == (i + 1) ?
                                        title
                                        :
                                        <NavLink
                                            onClick={() => console.log("NavLink 2" + `?section=${queryObj?.section}&&name=${queryObj.name}&&type=${queryObj?.hierarchyID?.split('-')[i]}&&sid=${queryObj.sid}&&link=${queryObj.link}&&hierarchy=${text}&&parent_id=${queryObj?.parent_id}`)}
                                            to={{
                                                pathname: `/${queryObj.link}`,
                                                search: `?section=${queryObj?.section}&&name=${queryObj.name}&&type=${queryObj?.hierarchyID?.split('-')[i]}&&sid=${queryObj.sid}&&link=${queryObj.link}&&hierarchy=${text}&&parent_id=${queryObj?.parent_id}${queryObj?.algo_Id ? '&&algo_Id=' + queryObj.algo_Id : ''}`
                                            }}>
                                            {title}
                                        </NavLink>
                                    }
                                </li>
                            </>
                        )
                    })
                }
            </ul>
        </div>
    )
}