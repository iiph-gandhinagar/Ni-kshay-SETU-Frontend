/** @jsxImportSource theme-ui */
import { cleanAlgorithmFlow } from '@tb-frontend/shared/Store/action/algorithmAction';
import moment from 'moment';
import queryString from 'query-string';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Heading } from 'theme-ui';
import useDraggableScroll from 'use-draggable-scroll';
import { AlgorithmCardWidthRightArrow, AlgorithmNameCard } from '../../components/AlgorithmDetailsCard';
const AlgorithmScreen = () => {
    const ref = useRef(null);
    const history = useHistory()
    const queryObj = queryString?.parse(history.location?.search);
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const { onMouseDown } = useDraggableScroll(ref);
    const dispatch = useDispatch();
    const algorithmDependentObj = useSelector(
        state => state?.algorithm?.algorithmDependentNodes,
    );
    const algorithmFlow = useSelector(state => state?.algorithm?.algorithmFlow);
    useEffect(() => {
        if (algorithmFlow?.length == 0) {
            history.goBack()
        }
        return function cleanup() {
            console.log("algorithmFlow cleanup");
            dispatch(cleanAlgorithmFlow());
        };
    }, []);
    useEffect(() => {
        var myDiv = document.getElementById("container2");
        window.scrollTo(0, myDiv.scrollHeight);
    }, [algorithmFlow])
    useEffect(() => {
        localStorage.setItem("module_start_time", moment(new Date()))
        console.log("module_start_time AlgorithmScreen useEffect", queryObj?.type, queryObj?.id);
        window.addEventListener("beforeunload", () => {
            const appTime = localStorage.getItem("module_start_time")
            const usage = localStorage.getItem("usage")
            const usagetime = parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds())
            if (usagetime) {
                if (usage) {
                    const oldArry = Object.assign([], JSON.parse(usage))
                    oldArry.push({ id: oldArry.length + 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                    console.log("module_start_time AlgorithmScreen beforeunload", oldArry);
                    localStorage.setItem("usage", JSON.stringify(oldArry))
                } else {
                    const newArry = Object.assign([], [])
                    newArry.push({ id: 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                    console.log("module_start_time AlgorithmScreen beforeunload", newArry);
                    localStorage.setItem('usage', JSON.stringify(newArry))
                }
            }
            localStorage.removeItem("module_start_time")
        })
        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                console.log("module_start_time AlgorithmScreen visibilitychange", queryObj?.type, queryObj?.id);
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
                            console.log("module_start_time AlgorithmScreen visibilitychange", oldArry);
                            localStorage.setItem("usage", JSON.stringify(oldArry))
                        } else {
                            const newArry = Object.assign([], [])
                            newArry.push({ id: 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                            console.log("module_start_time AlgorithmScreen visibilitychange", newArry);
                            localStorage.setItem('usage', JSON.stringify(newArry))
                        }
                    }
                    localStorage.removeItem("module_start_time")
                }

            }
        });
        document.addEventListener("mouseenter", () => {
            localStorage.setItem("app_start_time", moment(new Date()))
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
                        console.log("module_start_time AlgorithmScreen visibilitychange", oldArry);
                        localStorage.setItem("usage", JSON.stringify(oldArry))
                    } else {
                        const newArry = Object.assign([], [])
                        newArry.push({ id: 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                        console.log("module_start_time AlgorithmScreen visibilitychange", newArry);
                        localStorage.setItem('usage', JSON.stringify(newArry))
                    }
                }
                localStorage.removeItem("module_start_time")
            }
        })
        return function name(params) {
            console.log("module_start_time AlgorithmScreen cleanup",);
            const appTime = localStorage.getItem("module_start_time")
            if (appTime) {
                const usage = localStorage.getItem("usage")
                const usagetime = parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds())
                if (usagetime) {
                    if (usage) {
                        const oldArry = Object.assign([], JSON.parse(usage))
                        oldArry.push({ id: oldArry.length + 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                        console.log("module_start_time AlgorithmScreen cleanup", oldArry);
                        localStorage.setItem("usage", JSON.stringify(oldArry))
                    } else {
                        const newArry = Object.assign([], [])
                        newArry.push({ id: 1, module: queryObj?.type === 'CGC' ? 'NTEP Intervention' : queryObj?.type, activity_type: "submodule_usage", sub_module_id: parseInt(queryObj?.id), time: usagetime })
                        console.log("module_start_time AlgorithmScreen cleanup", newArry);
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
        <section sx={{ variant: 'layout.Home' }}>
            <Container>
                <Heading sx={{ mb: 4, color: "black2", pt: 8 }} variant="Raleway18">{algorithmDependentObj?.title}</Heading>
                <div className="algorithm-row row d-none d-lg-flex mx-0" id="container" ref={ref} onMouseDown={onMouseDown}>
                    {algorithmFlow && algorithmFlow?.map((item, i) => {
                        if (item?.has_options === 1 || algorithmFlow?.length == i + 1) {
                            return (
                                <AlgorithmCardWidthRightArrow algoTitle={algorithmDependentObj?.title} queryString={queryObj} algorithmFlow={algorithmFlow} key={i} item={item} appTranslations={appTranslations} />
                            )
                        } else {
                            return <AlgorithmNameCard key={i} title={item.title} />
                        }
                    })}
                </div>
                <div id="container2" className="d-block d-lg-none">
                    <Grid gap={4} columns={[1, null, null, 3, 4, 5, 6, 7, 8]} >
                        {algorithmFlow && algorithmFlow?.map((item, i) => {
                            if (item?.has_options === 1 || algorithmFlow?.length == i + 1) {
                                return (
                                    <AlgorithmCardWidthRightArrow
                                        algoTitle={algorithmDependentObj?.title}
                                        queryString={queryObj}
                                        algorithmFlow={algorithmFlow}
                                        key={i}
                                        item={item}
                                        appTranslations={appTranslations} />
                                )
                            } else {
                                return <AlgorithmNameCard key={i} title={item.title} />
                            }
                        })}
                    </Grid>
                </div>
            </Container>
        </section>
    );
}
export default AlgorithmScreen;