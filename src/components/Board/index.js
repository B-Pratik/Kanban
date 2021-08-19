import { observer } from "mobx-react-lite";
import Lane from "../Lane";
import store from "../../store";

import "./style.css";

const Board = () => {
  return (
    <div className="board">
      {store.lanes.map(({ type, cards }) => (
        <Lane type={type} key={type} cards={cards} />
      ))}
    </div>
  );
};

export default observer(Board);
