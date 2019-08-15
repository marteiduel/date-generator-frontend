import React from "react";

import { navigate, A } from "hookrouter";
import ActivityProfile from "../activityProfile";
import RestaurantProfile from "../restaurantProfile";

const Home = props => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    fetch("https://backend-date-generator.herokuapp.com/restaurants")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let rando = data[Math.floor(Math.random() * data.length)];
        console.log(rando);
        setRestaurants(
          data.filter(
            resaurant => resaurant.restaurant_id === rando.restaurant_id
          )
        );
      })
      .catch(error => console.log(error));

    // let rando = stuff[Math.floor(Math.random() * restaurants.length)];
    // console.log(rando);
  }, []);

  // const editRestaurant = id => {
  //   navigate(`/restaurant/${id}`);
  // };

  // const deleteRestaurant = id => {
  //   fetch(`https://backend-date-generator.herokuapp.com/restaurant/${id}`, {
  //     method: "DELETE"
  //   })
  //     .then(
  //       setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
  //     )
  //     .catch(error => console.log("delete error", error));
  // };

  const renderRestaurants = () => {
    return restaurants.map(restaurant => {
      return (
        <ActivityProfile
          key={restaurant.restaurant_id}
          id={restaurant.restaurant_id}
          price={restaurant.restaurant_avg_price}
          name={restaurant.restaurant_name}
          picture={restaurant.restaurant_picture}
          location={restaurant.restaurant_location}
          description={restaurant.restaurant_description}
          type={restaurant.restaurant_type}
          // deleteRestaurant={deleteRestaurant}
          // editRestaurant={editRestaurant}
        />
      );
    });
  };

  React.useEffect(() => {
    fetch("https://backend-date-generator.herokuapp.com/activities")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let rando = data[Math.floor(Math.random() * data.length)];
        console.log(rando);
        setActivities(
          data.filter(resaurant => resaurant.activity_id === rando.activity_id)
        );
      })
      .catch(error => console.log(error));

    // let rando = stuff[Math.floor(Math.random() * restaurants.length)];
    // console.log(rando);
  }, []);

  // const editActivities = id => {
  //   navigate(`/activity/${id}`);
  // };

  // const deleteActivity = id => {
  //   fetch(`https://backend-date-generator.herokuapp.com/activities/${id}`, {
  //     method: "DELETE"
  //   })
  //     .then(setActivities(activities.filter(activity => activity.id !== id)))
  //     .catch(error => console.log("delete error", error));
  // };

  const renderActivities = () => {
    return activities.map(activity => {
      return (
        <ActivityProfile
          key={activity.activity_id}
          id={activity.activity_id}
          name={activity.activity_name}
          price={activity.activity_avg_price}
          picture={activity.activity_picture}
          location={activity.activity_location}
          description={activity.activity_description}
          type={activity.activity_type}
          // deleteActivity={deleteActivity}
          // editActivities={editActivities}
        />
      );
    });
  };

  // const randomizeDate = () => {

  //   return (

  //   );
  // };

  return (
    <div className="homepage-container">
      <div className="App">
        <div className="navbar-wrapper">
          <div className="logo">{/* LOGO GOES HERE */}</div>

          {/*<Navbar />*/}
          <div className="btn-wrapper">
            {/*<A className="btn" href="/">Home</A>*/}
            <A href="/">Randomize</A>
            {/* <A href="/form">Create TODO</A> */}
          </div>
          <div className="userName">
            {/* <div className="log-in-status">Logged in as:</div> */}
          </div>
        </div>
        <div className="results-wrapper">
          <div className="activities-wrapper">{renderActivities()}</div>
          <div className="restaurants-wrapper">{renderRestaurants()}</div>
          {/* <div className="restaurants-wrapper">{randomizeDate}</div> */}
        </div>
        <div className="bottom-wrapper">
          <div className="footer-wrapper">
            <div className="button">
              <A href="/">Home</A>
              <A href="/form">Create TODO</A>
            </div>
            <div className="copyright">
              <h3>Copyright © 2019 All rights reserved.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
