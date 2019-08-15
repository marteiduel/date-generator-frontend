import React from "react";
import ReactDOM from "react-dom";

// import UniSpaceLogo from "./images/unispace-logo1.png";

//import Navbar from "./pages/navbar";
import Home from "./pages/home";

// import About from "./pages/about";
// import Message from "./pages/message";
// // import Picts from "./pages/picts";

// import RestaurantForm from "./restaurantForm";
// import ActivityForm from "./activityForm";
import { useRoutes } from "hookrouter";

import "./styles.css";

const App = () => {
  const routes = {
    "/": () => <Home />
    // "/activity-form": () => <ActivityForm />,
    // "/restaurant-form": () => <RestaurantForm />,
    // "/activity-form/:id": ({ id }) => <ActivityForm id={id} editMode={true} />,
    // "/restaurant-form/:id": ({ id }) => (
    //   <RestaurantForm id={id} editMode={true} />
    // ),
    // "/about": () => <About />,
    // "/message": () => <Message />
  };

  return <div className="homepage-container">{useRoutes(routes)}</div>;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
