import React, { useState, useEffect } from "react";
import axios from "axios";
import UserListComponent from "../components/UserListComponent";
import { useContext } from "react";
import { PostContext } from "../contextApi/postContext";

const UserList = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    getData(source);
    return ()=>{
      source.cancel('Request canceled by the user.');
    }
  }, []);


  const usePostContext = () => useContext(PostContext);
  const { setPostDetails } = usePostContext();


  const fetchAllUsers = async (source) => {
    try {
      return (await axios.get("https://jsonplaceholder.typicode.com/users",{
        cancelToken: source.token
      }))?.data ?? [];
    } catch (err) {
      return [];
    }
  };


  const fetchAllPost = async (source) => {
    try {
      return (await axios.get("https://jsonplaceholder.typicode.com/posts",{
        cancelToken: source.token
      }))?.data ?? [];
    } catch (err) {
      return [];
    }
  };

  async function getData(source) {
    try {
      const totalPost = await Promise.all([fetchAllUsers(source),fetchAllPost(source)]);

      if(!Array.isArray(totalPost)|| !totalPost){
        return 
      }


      const newPostData= totalPost[0].map((post)=>{
        return {
          ...post,
          totalPost:totalPost[1].filter((posts)=>posts.userId===post.id),
          totalPostLength:totalPost[1].filter((posts)=>posts.userId===post.id).length
        }
      })
      setUsers(newPostData)
      setPostDetails(totalPost[1])

    } catch (err) {}
  }

  return (
    <div className="container">
      <h1 className="mainText">Directory</h1>
        {users?.length>0 &&
          users.map((user) => (
            <UserListComponent key={user.id} user={user}/>
          ))}
    </div>
  );
};

export default UserList;
