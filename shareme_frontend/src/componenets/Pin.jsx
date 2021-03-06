import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

import {client, urlFor} from '../client';
import { fetchUser } from '../utils/fetchUser';


const Pin = ({pin: {postedBy,image, destination, _id, save}}) => {
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false)

    const navigate = useNavigate();
    const user = fetchUser();


    const alreadySaved = !!(save?.filter((item) => item?.postedBy._id === user?.uid))?.length;
    
    const savePin = (id)=>{
        if(!alreadySaved){
            setSavingPost(true);

            client
              .patch(id)
              .setIfMissing({save: []})
              .insert('after', 'save[-1]',[{
                _key: uuidv4(),
                userId: user.uid,
                postedBy: {
                    _type: postedBy,
                    _ref: user.uid,
                }
              }]).commit()
                    .then(()=>{
                        window.location.reload();
                        setSavingPost(false);
                    }).catch((err)=> console.log(err))
        }
    }

    const deletePin = (id) => {
        client
            .delete(id)
            .then(()=>{
                window.location.reload();
            })
    }

  return (
    <div className='m-2'>
        <div
            onMouseEnter={()=> setPostHovered(true)}
            onMouseLeave={()=> setPostHovered(false)}
            onClick={()=> navigate(`/pin-detail/${_id}`)}
            className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out
            hover:scale-105 z-50 origin-center hover:origin-bottom"
        >
            <img src={urlFor(image)?.width(250)?.url()} alt="user-post" className='rounded-lg w-full'/>
            {/* <img src={image?.asset?.url} alt="user-post" className='rounded-lg w-full'/> */}
            {postHovered &&(
                <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" 
                style={{height: '100%'}}
                >
                    <div className="flex item-center justify-between">
                        <div className="flex gap-2">
                            <a 
                                href={`${image?.asset.url}?dl=`} 
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                             >
                                <MdDownloadForOffline/>
                            </a>
                        </div>
                        {alreadySaved ? (
                            <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-4 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                {save?.length}Saved</button>
                            
                        ): ( 
                            <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-4 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                            onClick={(e) => {
                                e.stopPropagation();
                                savePin(_id);
                            
                            }}
                            > {savingPost ? 'Saving' : 'Save'}</button>
                        ) }
                    </div>
                    <div className="flex justify-between gap-2 w-full">
                        {destination && (
                            <a href={destination}
                                target="_blank"
                                rel='norefer'
                                className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                                    <BsFillArrowUpCircleFill/>{destination?.length > 20 ? destination.slice(8,20) : destination.slice(8)} 

                            </a>
                        )}
                        {postedBy?._id === user?.uid && (
                            <button 
                                type='button' 
                                className='bg-white px-3 p-1 opacity-70 hover:opacity-100 text-dark font-bold text-base rounded-2xl hover:shadow-md outline-none'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deletePin(_id);
                                
                                }}
                            > 
                                <AiTwotoneDelete/>
                            
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
        <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin