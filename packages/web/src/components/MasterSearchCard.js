/** @jsxImportSource theme-ui */
import React from 'react';
import { Heading } from 'theme-ui';
const MasterSearchCard = ({ name, source, onClick }) => {
  return (
    <div className="card mb-3 module-card col-lg-9 mx-auto pointer" style={{}} onClick={onClick}>
      <div className="row g-0 align-items-center">
        {source &&
          <div className="col-auto">
            <img style={{}} src={source} alt="Picture" sx={{ width: 55 }} className="m-3 me-1 " />
          </div>
        }
        <div className="col">
          <div className="card-body p-2">
            <Heading variant="Heading4" sx={{ color: "Blue_2" }}>{name}</Heading>
          </div>
        </div>
      </div>
    </div>

  );
}
export default MasterSearchCard;