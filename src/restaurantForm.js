import React from "react";
import DropzoneComponent from "react-dropzone-component";
import request from "superagent";
import { navigate } from "hookrouter";

import "../node_modules/react-dropzone-component/styles/filepicker.css";
import "../node_modules/dropzone/dist/min/dropzone.min.css";

const UserForm = props => {
  const [name, setName] = React.useState("");
  const [avg_price, setAvg_price] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [type, setType] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const pictureRef = React.useRef(null);

  React.useEffect(() => {
    if (props.id && props.editMode) {
      fetch(
        `https://backend-date-generator.herokuapp.com/restaurant/${props.id}`
      )
        .then(response => response.json())
        .then(data => {
          setName(data.name);
          setAvg_price(data.avg_price);
          setLocation(data.location);
          setDescription(data.description);
          setPicture(data.picture);
          setType(data.type);
        });
    }
  });

  const componentConfig = () => {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  };

  const djsConfig = () => {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  };

  const handleDrop = () => {
    return {
      addedfile: file => {
        let upload = request
          .post("https://api.cloudinary.com/v1_1/dlpirqjfb/image/upload")
          .field("upload_preset", "meme-images")
          .field("file", file);

        upload.end((err, response) => {
          if (err) {
            console.log("cloudinary err", err);
          }
          if (response.body.secure_url !== "") {
            setPicture(response.body.secure_url);
          }
        });
      }
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (props.editMode) {
      await fetch(
        `https://backend-date-generator.herokuapp.com/restaurant/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: name,
            avg_price: avg_price,
            location: location,
            picture: picture,
            description: description,
            type: type
          })
        }
      )
        .then(pictureRef.current.dropzone.removeAllFiles())
        .catch(error => console.log("put error", error));
    } else {
      await fetch(
        "https://backend-date-generator.herokuapp.com/add-restaurant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: name,
            picture: picture,
            avg_price: avg_price,
            location: location,
            description: description,
            type: type
          })
        }
      )
        .then(result => result.json())
        .then(setName(""))
        .then(setPicture(""))
        .then(setAvg_price(""))
        .then(setLocation(""))
        .then(setDescription(""))
        .then(setType(""))
        .then(pictureRef.current.dropzone.removeAllFiles())
        //after removing take user to homepage
        .catch(err => console.log("form submit err", err));
    }
    navigate("/");
  };
  return (
    <div className="restaurantform">
      <form onSubmit={handleSubmit}>
        <DropzoneComponent
          ref={pictureRef}
          config={componentConfig()}
          djsConfig={djsConfig()}
          eventHandlers={handleDrop()}
        >
          Drop your profile pic
        </DropzoneComponent>
        <input
          className="caption-input"
          type="text"
          placeholder="Restaurant name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div>
          <input
            className="text-input"
            type="text"
            placeholder="Average price"
            value={avg_price}
            onChange={e => setAvg_price(e.target.value)}
          />
        </div>
        <div>
          <input
            className="text-input"
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div>
          <input
            className="text-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            className="text-input"
            type="text"
            placeholder="Type"
            value={type}
            onChange={e => setType(e.target.value)}
          />
        </div>

        <button className="user-form-button" type="submit">
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default UserForm;
