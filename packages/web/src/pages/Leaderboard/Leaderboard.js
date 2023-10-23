/** @jsxImportSource theme-ui */
import queryString from 'query-string';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Text } from 'theme-ui';
import AchivementComponent from '../../components/Leaderboard/AchivementTab/AchivementTab';
import InformationComponent from '../../components/Leaderboard/InformationComponent/InformationComponent';
import LeaderboardComponent from '../../components/Leaderboard/LeaderboardComponent/LeaderboardComponent';
import TasksComponent from '../../components/Leaderboard/TasksComponent/TasksComponent';
import ProfileContainer from '../../components/ProfileContainer';
import TitleTag from '../../components/TitleTag';



const Leaderboard = () => {
  const history = useHistory()
  const queryObj = queryString?.parse(history.location.search)
  const { appTranslations } = useSelector((state) => state?.app);
  return (
    <>
      <TitleTag title="Leaderboard" />
      <section sx={{ variant: 'layout.Home', pb: 0 }} className="leaderboard-page">
        <div className="row align-items-start g-0">
          <div className="col-lg-3">
            <div className="leaderboard nav flex-column nav-pills me-lg-3 pt-2 min-vh-100" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <ProfileContainer ShowAppPerformance />
              <button onClick={() => {
                history.push("/Leaderboard?tab=Leaderboard")
              }} className={`nav-link ${queryObj?.tab === "Leaderboard" ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon me-2">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM8 17C7.45 17 7 16.55 7 16V11C7 10.45 7.45 10 8 10C8.55 10 9 10.45 9 11V16C9 16.55 8.55 17 8 17ZM12 17C11.45 17 11 16.55 11 16V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V16C13 16.55 12.55 17 12 17ZM16 17C15.45 17 15 16.55 15 16V14C15 13.45 15.45 13 16 13C16.55 13 17 13.45 17 14V16C17 16.55 16.55 17 16 17Z" />
                </svg>

                <Text variant="Raleway18" >{appTranslations.TAB_NAME_LEADERBOARD}</Text>

              </button>
              <button onClick={() => {
                history.push("/Leaderboard?tab=Tasks")
              }} className={`nav-link ${queryObj?.tab === "Tasks" ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon me-2">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22 2H6V18H22V2ZM4 6H2V22H18V20H4V6ZM9 11H19V9H9V11ZM15 15H9V13H15V15ZM9 7H19V5H9V7Z" />
                </svg>
                <Text variant="Raleway18" >{appTranslations.TAB_NAME_TASKS}</Text></button>
              <button onClick={() => {
                history.push("/Leaderboard?tab=Achivement")
              }} className={`nav-link ${queryObj?.tab === "Achivement" ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon me-2">
                  <g clip-path="url(#clip0_2290_16862)">
                    <path d="M17.55 12C23.85 11.55 24 7.95 24 4.5H19.5V0H4.5V4.5H0C0 7.95 0.150001 11.55 6.45 12C7.8 14.1 9.6 15 10.5 15V21C6 21 6 24 6 24H18C18 24 18 21 13.5 21V15C14.4 15 16.2 14.1 17.55 12ZM19.5 6H22.5C22.35 8.4 21.9 10.05 18.45 10.35C18.9 9.15 19.35 7.8 19.5 6ZM1.5 6H4.5C4.65 7.8 5.1 9.15 5.55 10.35C2.25 10.05 1.65 8.4 1.5 6ZM6.75 9.15C6 6.6 6 4.5 6 4.5V1.5H7.5V4.5C7.5 4.5 7.5 7.05 8.1 9.15C8.85 11.7 10.5 13.5 10.5 13.5C10.5 13.5 7.8 13.2 6.75 9.15Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2290_16862">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <Text variant="Raleway18" >{appTranslations.TAB_NAME_ACHIEVEMENTS}</Text></button>
              <button onClick={() => {
                history.push("/Leaderboard?tab=Information")
              }} className={`nav-link ${queryObj?.tab === "Information" ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon me-2">
                  <g clip-path="url(#clip0_2290_16864)">
                    <path d="M12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM13.395 9.882L11.895 16.9395C11.79 17.4495 11.9385 17.739 12.351 17.739C12.642 17.739 13.0815 17.634 13.38 17.37L13.248 17.994C12.8175 18.513 11.868 18.891 11.0505 18.891C9.996 18.891 9.5475 18.258 9.8385 16.9125L10.9455 11.7105C11.0415 11.271 10.9545 11.112 10.515 11.0055L9.8385 10.884L9.9615 10.3125L13.3965 9.882H13.395ZM12 8.25C11.6022 8.25 11.2206 8.09196 10.9393 7.81066C10.658 7.52936 10.5 7.14782 10.5 6.75C10.5 6.35218 10.658 5.97064 10.9393 5.68934C11.2206 5.40804 11.6022 5.25 12 5.25C12.3978 5.25 12.7794 5.40804 13.0607 5.68934C13.342 5.97064 13.5 6.35218 13.5 6.75C13.5 7.14782 13.342 7.52936 13.0607 7.81066C12.7794 8.09196 12.3978 8.25 12 8.25Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2290_16864">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg><Text variant="Raleway18" >{appTranslations.TAB_NAME_INFORMATION}</Text></button>
            </div>
          </div>
          <div className="col-lg-9 vh-100 overflow-auto">
            {queryObj?.tab === "Leaderboard" ?
              <LeaderboardComponent />
              : queryObj?.tab === "Tasks" ?
                <TasksComponent />
                : queryObj?.tab === "Achivement" ?
                  <AchivementComponent />
                  : <InformationComponent />
            }
          </div>
        </div>
      </section>
    </>
  );
}
export default Leaderboard;