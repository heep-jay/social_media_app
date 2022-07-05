import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {

  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if(categoryId){
      const query = searchQuery(categoryId);
      client.fetch(query)
      .then((data)=>{
        setPins(data);
        setLoading(false);
      }).catch((err)=>{
        console.log(err.message);
      })

    }else {
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data);
        setLoading(false);
      }).catch((err)=>{
        console.log(err.message);
      })

    }

  }, [categoryId])
  
  
  if(loading) return <Spinner message="we are adding new ideas to your feed!"/>
  if(!pins?.length) return 'No pins Available'
  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed