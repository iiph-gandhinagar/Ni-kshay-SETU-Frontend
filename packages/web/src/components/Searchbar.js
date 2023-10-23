/** @jsxImportSource theme-ui */
import React from 'react';
import { Heading } from 'theme-ui';

const Searchbar = ({ onChange, value, onCancel }) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-6">
          <div className="input-group searchbar" sx={{ height: 50 }}>
            {value ? "" :
              <img style={{}} src="../../../images/Search.png" alt="Icon" sx={{ width: 30, position: "absolute", top: "22%", left: 16, zIndex: 4 }} className="" />
            }
            <input type="text" className={`form-control rounded-pill ps-${value ? 3 : 5} `} placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" onChange={onChange} value={value} style={{ paddingRight: 75 }} />
            {value ?
              <Heading variant="Nunito18title" sx={{ color: "Blue_2", position: "absolute", top: "22%", right: 16, zIndex: 4 }} className="pointer" onClick={onCancel}>Cancel</Heading> : ""}
          </div>
        </div>
      </div>
    </>
  );
}
export default Searchbar;