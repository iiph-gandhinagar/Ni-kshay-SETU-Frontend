/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { Container } from 'theme-ui';
import MasterSearchTabs from '../components/MasterSearchTabs';
import Searchbar from '../components/Searchbar';

const MasterSearch = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <section sx={{ variant: 'layout.Home' }}>
        <Container sx={{ mt: 50 }}>
          <Searchbar onChange={e => setSearch(e.target.value)} value={search} onCancel={() => setSearch('')} />
          <MasterSearchTabs search={search}/>
        </Container>
      </section>
    </>
  );
}
export default MasterSearch;