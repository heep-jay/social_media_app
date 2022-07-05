import React, {useState, useEffect} from 'react';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';

const Search = ({searchTerm}) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(searchTerm !== ''){
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query)
      .then((data)=>{
        console.log("search", data);
        setPins(data);
        setLoading(false);
      }).catch((err)=> console.log(err.message));
    
    } else{
      
      client.fetch(feedQuery)
      .then((data)=>{
        console.log("feed", data);
        setPins(data);
        setLoading(false);
      }).catch((err)=> console.log(err.message));
      
    }
    if(searchTerm === 'undefined' || searchTerm === 'null'){

    }
    
  }, [searchTerm])
  
  return (
    <div>
      {loading && <Spinner message="Searching for Pins..."/>}
      { pins?. length !== 0 && <MasonryLayout pins={pins}/>}
      {pins?.length === 0 && searchTerm !== '' && searchTerm === undefined && searchTerm === null && !loading &&(
        <div className="mt-10 text-center text-xl">
          No Pins Found!
        </div>
      )}
    </div>
  )
}

export default Search