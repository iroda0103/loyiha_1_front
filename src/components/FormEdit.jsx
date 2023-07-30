import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

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

const UPDATE_ROOM = gql`
  mutation UpdateRoom($roomId: ID!, $input: UpdateRoomInput!) {
    updateRoom(id: $roomId, input: $input) {
      id
      name
      floor
    }
  }
`;

function FormEdit() {
  const { id } = useParams();
  const [update, setUpdate] = useState({});
  const navigate = useNavigate();

  const [
    getRoom,
    {
      called: getRoomCalled,
      loading: getRoomLoading,
      error: getRoomError,
      data: roomData,
      refetch,
    },
  ] = useLazyQuery(SHOW_ROOM);

  const [updateRoom, { loading: updateRoomLoading, error: updateRoomError }] =
    useMutation(UPDATE_ROOM);

  useEffect(() => {
    // Fetch room data on component mount
    getRoom({ variables: { roomId: id } }).then(({data})=>{
      setUpdate(data.room)
      console.log(data,'fffffffff');
    });
  }, [getRoom, id]);

  if (getRoomLoading || updateRoomLoading) {
    return "Loading...";
  }

  if (getRoomError || updateRoomError) {
    return `Error: ${
      getRoomError ? getRoomError.message : updateRoomError.message
    }`;
  }
  if (!getRoomCalled) {
    console.log(getRoomCalled);
  }
//   if (getRoomCalled) {
//     console.log('w');
//     return "Loading...";
//   }
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = () => {
    console.log("aa");
    // Call the updateRoom mutation to update the room data
    //   updateRoom({
    //     variables: {
    //       roomId: id,
    //       input: {
    //         name: update.name,
    //         floor: update.floor,
    //         for_stuff: update.for_stuff,
    //       },
    //     },
    //   })
    // .then(() => {
    //   // If the update is successful, navigate back to the room list or a success page
    //   navigate(`/rooms/${roomData.updateRoom.id}`); // Replace with the appropriate URL
    // })
    // .catch((error) => {
    //   console.error('Error updating room:', error);
    //   // Handle error here, e.g., show an error message to the user
    // });
  };

  return (
    <form
      action=""
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        updateRoom({
          variables: { roomId: id, input: update },
        }).then(({ data }) => {
          refetch();
          navigate(`/rooms/${data.updateRoom.id}`);
        });
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={update.name}
        onChange={(e) => setUpdate({ name: e.target.value })}
      />

      <label htmlFor="floor">Floor</label>
      <input
        type="number"
        name="floor"
        value={update.floor}
        onChange={(e) => setUpdate({ floor: +e.target.value })}
      />

      <label htmlFor="for-stuff">For stuff</label>
      <select
        name="for_stuff"
        value={update.for_stuff}
        onChange={(e) =>
          setUpdate({ for_stuff: e.target.value == "true" ? true : false })
        }
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>

      <button>Update</button>
    </form>
  );
}

export default FormEdit;
