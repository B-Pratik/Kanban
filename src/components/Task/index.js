import { useCallback } from "react";
import store from "../../store";

import "./style.css";

const Task = ({ title, priority, id, type }) => {
  const onStart = useCallback(() => {
    store.setCurrentDrag({ id, type });
  }, [id, type]);

  return (
    <div className="task" data-task-id={id} onDragStart={onStart} draggable>
      <div
        className={`task-priority ${priority === "HIGH" ? "high" : "low"}`}
      ></div>
      <div className="task-title">{title}</div>
    </div>
  );
};

export default Task;
