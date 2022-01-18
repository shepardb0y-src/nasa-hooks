import { useState } from "react";
import Heart from "react-heart";

const NASAData = (props) => {
  const [active, setActive] = useState(false);
  // In class components, we access props using this.props
  // In hooks, we don't use this, we just access directly
  // We pass props in the parameter inside of this component
  // so we can have access to the props object
  console.log("We are inside NASAData", props.item);
  return (
    <div className="nasa-data" key={props.item.data[0].nasa_id}>
      <h3>{props.item.data[0].title}</h3>
      <p>Location: {props.item.data[0].location}</p>
      <p>Created: {props.item.data[0].date_created}</p>
      <img className="nasa-img" src={props.item.links?.[0].href} alt="" />
      <p>Description: {props.item.data[0].description}</p>
      <div className="heart">
        <Heart isActive={active} onClick={() => setActive(!active)} />
      </div>
    </div>
  );
};

export default NASAData;
