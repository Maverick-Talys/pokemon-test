'use client'
import Image from "next/image";
import axios from 'axios'
import { useState, useEffect } from "react";

const GRAPHQL_API = 'https://graphql-pokeapi.graphcdn.app/';





export default function Home() {

  const [result, setResult] = useState(null)



  function request(searchName) {

    const query = `
  {
  pokemon(name: ${searchName}) {
    name
    id
    abilities {
      ability {
        id
        name
      }
    }
  }
}
`;

    axios.post(GRAPHQL_API, { query })
      .then(response => {
        console.log(JSON.stringify(response, null, 2));
        setResult(response.data.data.pokemon)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  console.log("FLAG", result)

  return (
    <div className="w-full">

      <main className="flex gap-8 items-center sm:items-start w">
        {/* Left bar */}
        <div className="w-2/5">

        </div>
        {/* main */}
        <div className="w-3/5 border border-red-500 min-h-screen justify-center">
          <label for="pokemon-search">Search pokemon:</label>
          <input type="search" id="pokemon-search" name="search-pokemon" onBlur={(v) => request(v.target.value)} />
          <p>Name : {result.name}</p>
        </div>
      </main>
    </div>
  );
}
