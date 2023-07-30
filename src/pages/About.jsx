import React from "react";
import { useQuery, gql } from "@apollo/client";
import {useNavigate, useParams } from "react-router-dom";
import {IoMdArrowRoundBack} from 'react-icons/io'
import './about.css'

const SHOW_ROOM = gql`
  query Rooms($roomId: ID!) {
    room(id: $roomId) {
      id
      name
      floor
      for_stuff
    }
  }
`;

function About() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleClick(){
    navigate(-1)
  }

  const { loading, error, data } = useQuery(SHOW_ROOM, {
    variables: { roomId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='about'>
      <IoMdArrowRoundBack onClick={handleClick} className="orqaga"/>
      <ul className='show-list'>
        <li className='show-list__item'><p className='show--name'>{data.room.name}</p></li>
        <li className='show-list__item show-list__item2'>
          <p>{data.room.floor}-qavatda joylashgan</p>
          <p>
            {data.room.for_stuff
              ? "Xodimlar uchun mo'ljallangan"
              : "O'quv uchun mo'ljallangan"}
          </p>
        </li>

      </ul>
    </div>
  );
}

export default About;
