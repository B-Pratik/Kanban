import { toJS } from "mobx";
import { types } from "mobx-state-tree";

const lanes = [
  {
    type: "TODO",
    cards: [
      {
        title: "call GG999",
        priority: "LOW",
        id: "QWERTY",
      },
      {
        title: "call FF999",
        priority: "LOW",
        id: "TYUIOP",
      },
    ],
  },
  {
    type: "DEV",
    cards: [
      {
        title: "call EE999",
        priority: "HIGH",
        id: "ASDFGH",
      },
      {
        title: "call DD999",
        priority: "LOW",
        id: "FGHJKL",
      },
    ],
  },
  {
    type: "QA",
    cards: [
      {
        title: "call CC999",
        priority: "HIGH",
        id: "ZXCVBN",
      },
    ],
  },
  {
    type: "DONE",
    cards: [
      {
        title: "call BB999",
        priority: "LOW",
        id: "XCVBNM",
      },
      {
        title: "call AA999",
        priority: "HIGH",
        id: "WSXEDC",
      },
    ],
  },
];

const _cards = types.model({
  title: types.string,
  priority: types.string,
  id: types.string,
});

const _lanes = types.model({
  type: types.string,
  cards: types.array(_cards),
});

const store = types
  .model({
    lanes: types.array(_lanes),
    currentDrag: types.optional(
      types.model({
        type: types.string,
        id: types.string,
      }),
      { type: "", id: "" },
      [null, undefined]
    ),
  })
  .actions((self) => ({
    setCurrentDrag: (drag) => {
      self.currentDrag = drag;
    },
    moveDragToLane: (type) => {
      const { id, type: fromType } = self.currentDrag;

      if (fromType === type) {
        return;
      }

      const { cards: laneCards } = self.lanes.find(
        ({ type: _type }) => _type === fromType
      );

      const itemIndex = laneCards.findIndex(({ id: _id }) => id === _id);
      if (itemIndex === -1) {
        return;
      }

      const item = toJS(laneCards.at(itemIndex));

      laneCards.splice(itemIndex, 1);

      self.lanes.find(({ type: _type }) => _type === type).cards.push(item);
    },
  }));

export default store.create({ lanes });
