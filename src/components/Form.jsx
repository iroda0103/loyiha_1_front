import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const ADD_ROOM = gql`
  mutation CreateROOM($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
    }
  }
`;

const GET_ROOMS = gql`
 query Rooms($input: QueryRoomsInput) {
  rooms(input: $input) {
    list {
      id
      name
      floor
      for_stuff
    }
    limit
    offset
    total
  }
}
`;

function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [floor, setFloor] = useState(1);
  const [for_stuff, setForStuff] = useState(false);
  const [create, setCreate] = useState({});

  const [
    getRoom,
    {
      called: getRoomCalled,
      loading: getRoomLoading,
      error: getRoomError,
      data: roomData,
      refetch,
    },
  ] = useLazyQuery(GET_ROOMS);
   const [addRoom, { loading, error,called }] = useMutation(ADD_ROOM);


  if (loading || getRoomLoading) {
    return 'Loading...';
  }

  if (error || getRoomError) {
    return `Error: ${(error.message)?error.message:getRoomError.message}`;
  }


  // useEffect(() => {
  //   // Fetch room data on component mount
  //   getRoom({ variables: { roomId: id } }).then(({data})=>{
  //     setCreate(data.room)
  //     console.log(data,'fffffffff');
  //   });
  // }, [getRoom, id]);

  return (
    <form
      action=""
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        addRoom({
          variables: { input: { name, floor, for_stuff } },
        })
        .then(({ data }) => {
          navigate(`/rooms/${data.createRoom.id}`);
        });
      }}
    >
      <label htmlFor="name">Name</label>
      <input type="text"  name="name" value={name} onChange={(e)=>setName(e.target.value)} required/>

      <label htmlFor="floor">Floor</label>
      <input type="number"  name="floor" value={floor} onChange={(e)=>setFloor(+e.target.value)}/>

      <label htmlFor="for-stuff">For stuff</label>
      <select name="for_stuff"  value={for_stuff} onChange={(e)=>setForStuff( (e.target.value == "true" )? true : false)} required>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>

      <button>Save</button>
    </form>
  );
}

export default Form;
