import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import CustomDateComponent from "../components/CustomDateComponent";
import UserDetailComponent from "../components/UserDetailComponent";
import { memo } from "react";
import { PostContext } from "../contextApi/postContext";
import DisplayPost from "../components/DisplayPost";
import DisplayPostModal from "../components/DisplayPostModal";

let newDate = new Date();

const POST_LIMIT = 3;

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState({
    currentTime: newDate.toISOString(),
    dayOfWeek: newDate.getDay(),
  });
  const [paused, setPaused] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [userPost, setPost] = useState([]);

  const [modalToggle, setModalToggle] = useState(false);
  const [modalPost, setModalPost] = useState({});

  const usePostContext = () => useContext(PostContext);

  const { postDetails } = usePostContext();

  useEffect(() => {
    // Fetch user details
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));

    // Fetch list of countries
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log(error));

    setPost(postDetails.filter((e) => e.userId == id).filter((_, i) => i < POST_LIMIT));
  }, [id]);

  useEffect(() => {
    let interval;
    if (!paused) {
      interval = setInterval(() => {
        if (selectedCountry) {
          fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setCurrentTime({
                currentTime: data.datetime,
                dayOfWeek: data.day_of_week,
              });
            })
            .catch((error) => console.log(error));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paused, selectedCountry]);

  const handlePauseResume = () => {
    setPaused(!paused);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto" style={modalToggle ? { backgroundColor:"black",opacity:"0.1 "} : {}}>
        <div className="userDetailsNav">
          <button className="backButton">
            <Link to="/" className="text-blue-500 mb-4 block">
              Back
            </Link>
          </button>
          <div className="userDetailsNavSub">
            <select onChange={handleCountryChange} className="userDetailsNavSelect">
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <CustomDateComponent time={currentTime} />
            <button className="startStopButton" onClick={handlePauseResume}>
              {paused ? "Start" : "Pause"}
            </button>
          </div>
        </div>
        <UserDetailComponent user={user} />

        <div className="displayUserPost">
          {userPost.length > 0 &&
            userPost.map((post, index) => (
              <DisplayPost key={index} post={post} setModalToggle={setModalToggle} setModalPost={setModalPost} />
            ))}
        </div>
      </div>
      <div className="displayPostMaincontainer">
        {modalToggle && <DisplayPostModal post={modalPost} setModalToggle={setModalToggle} />}
      </div>
    </>
  );
};

export default memo(UserDetails);
