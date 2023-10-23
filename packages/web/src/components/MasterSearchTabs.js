/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { Heading } from 'theme-ui';
import FaqComponent from './MasterSearch/FaqComponent';
import ModulesComponent from './MasterSearch/ModulesComponent';
import ResourceMaterialComponent from './MasterSearch/ResourceMaterialComponent';
import SubModulesComponent from './MasterSearch/SubModulesComponent';
import TitleTag from '../components/TitleTag';
const MasterSearchTabs = ({ search }) => {
    const [active, setActive] = useState("get-modules");
    const onTabChange = async (tab) => {
        setActive(tab)
    }
    return (
        <React.Fragment>
            <TitleTag title="Master Search" />
            <section className="blog-area blog-details-area ptb-120 mt-4">
                <div className="container">
                    <div className="shop-details-area shop-details">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="shop-details-tabs d-flex justify-content-center text-center">
                                    <ul id="tabs" className="w-100 d-lg-flex d-block">
                                        <li
                                            onClick={() => onTabChange("get-modules")}
                                            className={active == "get-modules" ? "active" : "inactive"}
                                            id="get-modules"
                                        >
                                            <Heading variant="Nunito18title" sx={{}} className="">Modules</Heading>
                                        </li>
                                        <li
                                            onClick={() => onTabChange("get-sub-modules")}
                                            className={active == "get-sub-modules" ? "active" : "inactive"}
                                            id="get-sub-modules"
                                        >
                                            <Heading variant="Nunito18title" sx={{}} className="">Sub Module</Heading>
                                        </li>
                                        <li
                                            onClick={() => onTabChange("get-static-resource-material")}
                                            className={active == "get-static-resource-material" ? "active" : "inactive"}
                                            id="get-static-resource-material"
                                        >
                                            <Heading variant="Nunito18title" sx={{}} className="">Resource Material</Heading>
                                        </li>
                                        <li
                                            onClick={() => onTabChange("get-faq")}
                                            className={active == "get-faq" ? "active" : "inactive"}
                                            id="get-faq"
                                        >
                                            <Heading variant="Nunito18title" sx={{}} className="">FAQ</Heading>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {active == 'get-modules' ? <ModulesComponent search={search} /> :
                            active == "get-sub-modules" ? <SubModulesComponent search={search} />
                                : active == "get-static-resource-material" ? <ResourceMaterialComponent search={search} />
                                    : <FaqComponent search={search} />
                        }

                    </div>

                </div>
            </section>
        </React.Fragment>

    );
}
export default MasterSearchTabs