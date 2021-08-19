import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import Task from "../Task";
import store from "../../store";

import "./style.css";

const getLaneTitle = (type) => {
  switch (type) {
    case "DEV":
      return "Development";
    case "QA":
      return "Testing";
    case "DONE":
      return "Done";

    default:
      return "To Do";
  }
};

const Lane = ({ type, cards }) => {
  const onDrop = useCallback(
    () => {
      store.moveDragToLane(type);
    },
    [type]
  );

  const onHover = useCallback((e) => e.preventDefault(), []);

  return (
    <div className="lane" onDrop={onDrop} onDragOver={onHover}>
      <div className="lane-title">{getLaneTitle(type)}</div>
      <div className="lane-body">
      {cards.map((task) => (
        <Task key={task.id} type={type} {...task} />
      ))}
      </div>
    </div>
  );
};

export default observer(Lane);
