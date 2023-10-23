/** @jsxImportSource theme-ui */
import React from 'react';
import { Helmet } from "react-helmet";
const TitleTag = (props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        {props?.title ?
          <title> {props?.title} | Ni-kshay Setu </title>
          :
          <title> Ni-kshay Setu </title>
        }
      </Helmet>
    </>
  )
}

export default TitleTag;