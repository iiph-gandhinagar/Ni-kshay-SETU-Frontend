/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading } from 'theme-ui';
const TasksCard = (props) => {
  const { lederBoardTaskList } = useSelector(state => state?.leaderBoard);
  return (
    <div className="row align-items-center mx-0 justify-content-center g-xl-5">
      <div className="col-sm-6 col-xl-4 mb-2 mb-lg-5">
        <Box variant="TasksCompleted">
          <Flex sx={{ alignItems: 'center' }}>
            <img style={{}} src="../../../images/Task1.png" alt="Task" sx={{ width: 65 }} className="me-2" />
            <div>
              <Heading variant="Nunito18title" sx={{ color: "white" }}>{lederBoardTaskList?.total_task_completed}</Heading>
              <Heading variant="Nunito18title" sx={{ color: "white" }}>Total Tasks Completed</Heading>
            </div>
          </Flex>
        </Box>
      </div>
      <div className="col-sm-6 col-xl-4 mb-2 mb-lg-5">
        <Box variant="TasksCompleted">
          <Flex sx={{ alignItems: 'center' }}>
            <img style={{}} src="../../../images/pending-actions.png" alt="Task" sx={{ width: 65 }} className="me-2" />
            <div>
              <Heading variant="Nunito18title" sx={{ color: "white" }}>{lederBoardTaskList?.total_task_pending}</Heading>
              <Heading variant="Nunito18title" sx={{ color: "white" }}>Total Tasks Pending</Heading>
            </div>
          </Flex>
        </Box>
      </div>
    </div>

  );
}
export default TasksCard;