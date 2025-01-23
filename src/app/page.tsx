'use client'
import Image from "next/image";
import axios from 'axios'
import { useState, useEffect } from "react";

const GRAPHQL_API = 'https://graphql-pokeapi.graphcdn.app/';


const query = `
  {
  pokemon(name: "pikachu") {
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


export default function Home() {

  const [result, setResult] = useState(null)

  useEffect(() => {
    axios.post(GRAPHQL_API, { query })
      .then(response => {
        console.log(response.data.pokemon);
        setResult(response.data.pokemon)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])

  console.log("FLAG", result)

  return (
    <div className="w-full">

      <p>Loading ...</p>

      <main className="flex gap-8 items-center sm:items-start w">
        {/* Left bar */}
        <div className="w-2/5">

        </div>
        {/* main */}
        <div className="w-3/5 border border-red-500 min-h-screen">
          <p>{result?.data.pokemon.name}</p>
        </div>
      </main>
    </div>
  );
}
