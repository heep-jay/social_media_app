import React ,{ useState , useEffect}from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { client } from '../client';
import { auth } from '../firebase';
import { userQuery, userCreatedPinsQuery, userSavedPinsQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('Created');

  const navigate = useNavigate();
  const {userId} = useParams();

 
  useEffect(() => {
    const query = userQuery(userId);

    

    client.fetch(query)
    .then((data)=>{
      console.log('user',data);
      setUser(data[0]);
    }).catch((err)=> console.log(err.message))
  
    
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
      .then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery)
      .then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);
  
  const signOut = ()=>{
    auth.signOut()
    .then(()=>{
      
      localStorage.clear();
      
      navigate('/login', {replace: true});

    })
  }

   if(!user){
    return <Spinner message="Loading Profile"/>
   }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5"'>
        <div className='relative flex flex-col mb-7'>
          <div className="flex flex-col justify-center items-center">
            <img 
              src={randomImage} 
              alt="user-banner-image"
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              
              />
              <img 
              src={user.image} 
              alt="user-profile-pic"
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              
              />
              <h1 className="font-bod text-3xl text-center mt-3">{user.userName}</h1>
              {loading && <Spinner/>}
              <div className="absolute top-0 z-1 right-0 p-2">
                {userId === user._id && (
                  <button
                    type="button"
                    className="bg-white flex p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={signOut}
                    >
                      <AiOutlineLogout  color='red' fontSize={21}/>
                  </button>
                )
                  
                }
              </div>
          </div>
          <div className="text-center mb-7">
            <button 
              type='button'
              onClick={(e) =>{
                setText(e.target.textContent);
                setActiveBtn('created')
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Created
            </button>
            <button 
              type='button'
              onClick={(e) =>{
                setText(e.target.textContent);
                console.log(e.target.textContent);
                setActiveBtn('saved')
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Saved
            </button>
            
          </div>
          { pins?.length ? (
            <div className="px-2">
            <MasonryLayout pins={pins}/>
          </div>
          ): (
            <div className='m-auto font-bold'>
              {`No pins ${text} yet!`}
            </div>
          ) }
          
        </div>
      </div>
    </div>
  )
}

export default UserProfile