import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import {IoMdArrowRoundBack} from 'react-icons/io'



function Create() {
  const navigate = useNavigate();

  function handleClick(){
    navigate(-1)
  }

 

  return (
    <div className="change">
      <IoMdArrowRoundBack onClick={handleClick} className="orqaga"/>
      <div className="change_form">
        <Form></Form>
      </div>
    </div>
  );
}

export default Create;
