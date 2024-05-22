
import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('HA9TF7TLGD', '9e4ddc798d17ad6fe7e3ba611f697589');
const index = searchClient.initIndex('contacts');

const Search = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    

    const handleSearch = async (event) => {
        setQuery(event.target.value);
    
        if (event.target.value.length > 2) {
          const { hits } = await index.search(event.target.value);
          setResults(hits);
        } else {
          setResults([]);
        }
    };

    return (
        <>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search contacts..."
            />
            <ul>
                {results.map((result) => (
                <li key={result.objectID}>
                    {result.name} - {result.email} - {result.phone}
                </li>
                ))}
            </ul>
        </>
    )
}

export default Search