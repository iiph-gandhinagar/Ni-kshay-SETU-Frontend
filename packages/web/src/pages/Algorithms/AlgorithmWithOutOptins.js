/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'theme-ui';


const AlgorithmWithOutOptins = (props) => {
    const algorithmFlow = useSelector(state => state?.algorithm?.algorithmFlow);
    const MasterObject = props?.history?.location?.state;
    return (
        <>
            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    {/* <div className="page-title-area pt-3">
                        <ul>
                            <li>
              
                                Home
                               
                            </li>

                            <img src={"../chevron-right.svg"} alt="chevron-right" sx={{ marginLeft: 1, marginRight: 1, }} />
                            <li>{MasterObject?.type}</li>
                            <img src={"../chevron-right.svg"} alt="chevron-right" sx={{ marginLeft: 1, marginRight: 1, }} />
                            <li>{algorithmDependentObj?.title}</li>
                        </ul>
                    </div> */}
                    <Heading sx={{ mb: 4, fontSize: [2, 3], color: "colorDark1" }} variant="Raleway18">{MasterObject?.title}</Heading>
                    <Grid gap={4} columns={[2, null, 3]}>
                        {MasterObject && MasterObject?.children?.map((item, i) => {
                            return (
                                <AlgorithmDetailsCard
                                    algoTitle={MasterObject?.title}
                                    algorithmFlow={algorithmFlow} key={i} item={item} />
                            )
                        })}
                    </Grid>
                </Container>
            </section>
        </>
    );
}
export default AlgorithmWithOutOptins;