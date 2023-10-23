/** @jsxImportSource theme-ui */
import React from 'react';
import { Container } from 'theme-ui';
import Features from '../components/home/Features';
import NewsFeed from '../components/home/NewsFeed';
import RecentlyAdded from '../components/home/RecentlyAdded';
import SimilarApplications from '../components/home/SimilarApplications';
import TopModules from '../components/home/TopModules';

const Home = () => {

  return (
    <>
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          <TopModules />
          <Features />
          <NewsFeed />
          <SimilarApplications />
          <RecentlyAdded />
        </Container>
      </section>
    </>
  );
}
export default Home;