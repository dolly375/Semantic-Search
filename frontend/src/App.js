import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";

function App() {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function handleSearch(query) {

    if (query.trim() === "") {

      setError("Please enter symptoms.");
      setResults([]);

      return;
    }


    try {

      setLoading(true);
      setError("");


      // Backend API Call
      const response = await fetch(
        "http://localhost:8000/search",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query: query,
          }),
        }
      );


      if (!response.ok) {

        const errorData = await response.json();

        throw new Error(
          errorData.message || "API Error"
        );

      }


      const data = await response.json();


      setResults(data);


    } 
    
    catch (error) {

      console.log(error);

      setError(
        error.message || "Something went wrong."
      );

    } 
    
    finally {

      setLoading(false);

    }

  }



  return (

    <div className="container">

      <div className="search-card">

        <h1>
          Semantic Search for Homeopathy EMR
        </h1>


        <SearchBar
          onSearch={handleSearch}
          loading={loading}
        />


        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}



        {loading && (
          <p>
            Searching medicines...
          </p>
        )}



        {results.map((item, index) => (

          <ResultCard

            key={index}

            medicine={item.medicine}

            score={item.score}

            symptoms={item.symptoms}

          />

        ))}



        {results.length === 0 && !loading && !error && (

          <p>
            No results found.
          </p>

        )}


      </div>

    </div>

  );

}


export default App;