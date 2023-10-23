/** @jsxImportSource theme-ui */
import { cleanAlgorithmFlow, cleanAlgorithmsDependentNode, getDynamicAlgoDependentNode, getlgorithmsDependentNode } from '@tb-frontend/shared/Store/action/algorithmAction';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Heading } from 'theme-ui';
import { AlgorithmDetailsCard, AlgorithmDetailsCardExpandable } from '../../components/AlgorithmDetailsCard';
import TitleTag from '../../components/TitleTag';
import moment from "moment"
const AlgorithmDetails = (props) => {
    const dispatch = useDispatch();
    const algorithmDependentObj = useSelector(
        state => state?.algorithm?.algorithmDependentNodes,
    );
    const [expand, setExpand] = useState({});
    const algorithmFlow = useSelector(state => state?.algorithm?.algorithmFlow);
    const queryObj = queryString?.parse(props.location?.search)
    useEffect(() => {
        let isMounted = true;
        const unsubscribe = async () => {
            if (isMounted && queryObj?.id && queryObj?.type !== 'Dynamic') {
                dispatch(getlgorithmsDependentNode(queryObj));
            } else if (isMounted && queryObj?.id && queryObj?.type === 'Dynamic') {
                dispatch(getDynamicAlgoDependentNode(queryObj));
            }
            dispatch(cleanAlgorithmsDependentNode());
        };

        if (isMounted) {
            unsubscribe();
        }
        return function cleanup() {
            console.log("cleanup");
            isMounted = false;
        };
    }, []);
    useEffect(() => {
        localStorage.setItem("module_start_time", moment(new Date()))
        console.log("module_start_time useEffect", queryObj?.type, queryObj?.id);
        window.addEventListener("beforeunload", () => {
            const appTime = localStorage.getItem("module_start_time")
            const usage = localStorage.getItem("usage")
            const usagetime = parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds())
            if (usagetime) {
                if (usage) {
                    const oldArry = Object.assign([], JSON.parse(usage))
                    oldArry.push({ id: oldArry.length + 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                    console.log("module_start_time beforeunload", oldArry);
                    localStorage.setItem("usage", JSON.stringify(oldArry))
                } else {
                    const newArry = Object.assign([], [])
                    newArry.push({ id: 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                    console.log("module_start_time beforeunload", newArry);
                    localStorage.setItem('usage', JSON.stringify(newArry))
                }
            }
            localStorage.removeItem("module_start_time")
        })
        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                console.log("module_start_time visibilitychange", queryObj?.type, queryObj?.id);
                localStorage.setItem("module_start_time", moment(new Date()))
            } else {
                const appTime = localStorage.getItem("module_start_time")
                if (appTime) {
                    const usage = localStorage.getItem("usage")
                    const usagetime = parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds())
                    if (usagetime) {
                        if (usage) {
                            const oldArry = Object.assign([], JSON.parse(usage))
                            oldArry.push({ id: oldArry.length + 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                            console.log("module_start_time visibilitychange", oldArry);
                            localStorage.setItem("usage", JSON.stringify(oldArry))
                        } else {
                            const newArry = Object.assign([], [])
                            newArry.push({ id: 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                            console.log("module_start_time visibilitychange", newArry);
                            localStorage.setItem('usage', JSON.stringify(newArry))
                        }
                    }
                    localStorage.removeItem("module_start_time")
                }

            }
        });
        document.addEventListener("mouseenter", () => {
            localStorage.setItem("module_start_time", moment(new Date()))
        })
        document.addEventListener("mouseleave", (event) => {
            const appTime = localStorage.getItem("module_start_time")
            if (appTime) {
                const usage = localStorage.getItem("usage")
                const usagetime = parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds())
                if (usagetime) {
                    if (usage) {
                        const oldArry = Object.assign([], JSON.parse(usage))
                        oldArry.push({ id: oldArry.length + 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                        console.log("module_start_time visibilitychange", oldArry);
                        localStorage.setItem("usage", JSON.stringify(oldArry))
                    } else {
                        const newArry = Object.assign([], [])
                        newArry.push({ id: 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                        console.log("module_start_time visibilitychange", newArry);
                        localStorage.setItem('usage', JSON.stringify(newArry))
                    }
                }
                localStorage.removeItem("module_start_time")
            }
        })
        return function name(params) {
            console.log("module_start_time cleanup",);
            const appTime = localStorage.getItem("module_start_time")
            if (appTime) {
                const usage = localStorage.getItem("usage")
                const usagetime = parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds())
                if (usagetime) {
                    if (usage) {
                        const oldArry = Object.assign([], JSON.parse(usage))
                        oldArry.push({ id: oldArry.length + 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                        console.log("module_start_time cleanup", oldArry);
                        localStorage.setItem("usage", JSON.stringify(oldArry))
                    } else {
                        const newArry = Object.assign([], [])
                        newArry.push({ id: 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                        console.log("module_start_time cleanup", newArry);
                        localStorage.setItem('usage', JSON.stringify(newArry))
                    }
                }
                localStorage.removeItem("module_start_time")
            }
            document.removeEventListener("visibilitychange", () => {
            })
            window.removeEventListener("beforeunload", () => {
            })
            document.removeEventListener("mouseleave", () => {
            })
            document.removeEventListener("mouseenter", () => {
            })
        }
    }, [])
    return (
        <>
            <TitleTag title={algorithmDependentObj?.title} />
            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    <Heading sx={{ py: 8, color: "black2" }} variant="Raleway18">{algorithmDependentObj?.title}</Heading>
                    <Grid gap={45} columns={[1, null, 2, 3]}>
                        {algorithmDependentObj && algorithmDependentObj?.children?.map((item, i) => {
                            return (
                                <AlgorithmDetailsCardExpandable
                                    is_expandable={item?.is_expandable === 1}
                                    algoTitle={algorithmDependentObj?.title}
                                    algorithmFlow={algorithmFlow}
                                    key={i}
                                    item={item}
                                    isSelect={item?.id === expand?.id}
                                    onSelect={() => {
                                        if (item?.id === expand?.id) {
                                            setExpand({})
                                        } else {
                                            setExpand(item)
                                        }
                                    }}
                                    queryString={props.location?.search}
                                    openBydefault={queryObj?.bmiID == item?.id}
                                />
                            )
                        })}
                    </Grid>
                </Container>
            </section>
        </>
    );
}
export default AlgorithmDetails;