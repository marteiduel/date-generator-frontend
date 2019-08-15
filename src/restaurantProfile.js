import React from "react";

const RestaurantProfile = props => {
  return (
    <div className="activity-comp">
      <img src={props.picture} alt="Activity pic" />
      <h2>{props.name}</h2>
      <p className="avg_price">{props.avg_price}</p>
      <p className="location">{props.location}</p>
      <p className="description">{props.description}</p>
      <p className="type">{props.type}</p>
    </div>
  );
};

export default RestaurantProfile;
