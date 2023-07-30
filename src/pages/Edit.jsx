import React from "react";
import Form from "../components/Form";
import {IoMdArrowRoundBack} from 'react-icons/io'
import { useNavigate } from "react-router-dom";
import './change.css'
import FormEdit from "../components/FormEdit";

function Edit() {

  const navigate = useNavigate();

  function handleClick(){
    navigate(-1)
  }
  return (
    <div className="change">
      <IoMdArrowRoundBack onClick={handleClick} className="orqaga"/>
      <div className="change_form">
        <FormEdit></FormEdit>
      </div>
    </div>
  );
}

export default Edit;
