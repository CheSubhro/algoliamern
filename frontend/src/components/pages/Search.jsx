import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { TextField, List, ListItem, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const searchClient = algoliasearch('HA9TF7TLGD', '9e4ddc798d17ad6fe7e3ba611f697589');
const index = searchClient.initIndex('contacts');

const Search = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.ctrlKey && event.key === 'k') {
				setQuery('');
				setResults([]);
		}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

  	const handleSearch = async (event) => {
    setQuery(event.target.value);

    if (event.target.value.length > 2) {
      const { hits } = await index.search(event.target.value);
      setResults(hits);
    } else {
      setResults([]);
    }
};

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <>
      <TextField
        label="Search contacts..."
        variant="outlined"
        value={query}
        onChange={handleSearch}
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
      <List>
        {results.map((result) => (
          <ListItem key={result.objectID}>
            {result.name} - {result.email} - {result.phone}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Search;
