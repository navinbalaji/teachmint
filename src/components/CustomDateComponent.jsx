import React from "react";

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CustomDateComponent = ({ time }) => {
  const getDateAndTime = () => {
   try{
    if (!time?.currentTime || !time?.dayOfWeek) {
      return null;
    }
    let timeObj = time.currentTime.split("T")[1].split(":");
    let hours = timeObj[0];
    let minutes = timeObj[1];
    let seconds = timeObj[2].split(".")[0];

    let dateObj = time.currentTime.split("T")[0].split("-");
    let date = dateObj[2];
    let month = dateObj[1];
    let year = dateObj[0];

    return [`${date} : ${month} : ${year}  ${days[time.dayOfWeek]}`,`${hours} : ${minutes} : ${seconds}`];
   }catch(err){
    return null
   }
  };

  return <div className="customDateComponent">{time && getDateAndTime().map((e,i) => <p key={i}>{e}</p>)}</div>;
};

export default CustomDateComponent;
