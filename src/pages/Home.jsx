import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./style.css";
import Lists from "../components/Lists";

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


function Home() {
  const [offset,setOffset]=useState(0)

  function handleOffset(value){
    setOffset(value)
    console.log(offset,'ooooooooooooop');
  }
  
  // const { loading, error, data } = useQuery(GET_ROOMS, { variables: { roomId: "2" } });
  const { loading, error, data,refetch } = useQuery(GET_ROOMS,{variables:{
    "input":{
      // "filters": {
      //   "floor": 2,
      //   "for_stuff": false
      // },
      "page": {
        "limit": 4,
        "offset":offset
      },
      // // "q": "g",
      // "sort": {
      //   "by": "FLOOR",
      //   "order": "ASC"
      // }
    }
  }});
  
  if (loading ) return <p>Loading...</p>;
  if (error ) return <p>Error : {error.message}</p>;

  return (<div className="home" >
    <Lists data={data} handleOffset={handleOffset} refetch={refetch}></Lists>
  </div>
   
  );
}

export default Home;
