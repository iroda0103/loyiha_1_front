import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { LuEdit2 } from "react-icons/lu";
import { RiDeleteBinFill } from "react-icons/ri";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const REMOVE_ROOM = gql`
mutation RemoveRoom($id: ID!) {
  removeRoom(id: $id) {
    id
  }
}
`;

function Lists(props) {
  const { data, handleOffset,refetch } = props;
  // const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    // setPage(value-1);
    let offset = +value;
    handleOffset((value-1) * data.rooms.limit);
  };
  const a=data.rooms.total % data.rooms.limit
  const count =(a==0)?data.rooms.total/ data.rooms.limit:
    ((data.rooms.total - a) / data.rooms.limit+1);
    console.log(data.rooms.total,data.rooms.limit,count,'llllllllll',data.rooms);

    const [removeRoom,{loading,error}]=useMutation(REMOVE_ROOM)
    if (loading) {
      return 'Loading...';
    }
  
    if (error) {
      return `Error: ${error.message}`;
    }

  return (
    <div className="page">
      <div className="create_div"><Link to={`/rooms/create`}><button>Create</button></Link></div>
      <ul className="room--list">
        {data.rooms.list.map((room) => (
          <li className="room__item" key={room.id}>
            <p>{room.id}
              {room.name},{room.floor}-qavat ,
              {room.for_stuff ? "Hodimlar uchun" : ""}
            </p>
            <div className="icons">
              <Link to={`/rooms/${room.id}`}>
                <BiShow className="icon--blue" />
              </Link>
              <Link to={`/rooms/${room.id}/edit`}>
                <LuEdit2 className="icon-brown" />
              </Link>
              <RiDeleteBinFill
                className="icon-red"
                onClick={() =>
                  removeRoom({
                    variables: { id: room.id },
                  }).then(refetch)
                }
              />
            </div>
          </li>
        ))}
      </ul>

      <Stack spacing={2}>
        <Pagination count={count} color="primary" onChange={handleChange} />
      </Stack>
    </div>
  );
}

export default Lists;
