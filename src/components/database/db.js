let dummy_store = [
  {
    id: 1,
    address: "2002,198 Queen St.E.Brampton",
    assignedStore: true,
    baseStore: true,
  },
  {
    id: 2,
    address: "2003,198 king St.E.Toronto",
    assignedStore: false,
    baseStore: false,
  },
  {
    id: 3,
    address: "2004,198 Queen St.E.NewYork",
    assignedStore: true,
    baseStore: false,
  },
  {
    id: 4,
    address: "2005,198 Queen St.E.Brampton",
    assignedStore: false,
    baseStore: false,
  },
];

export function getAllData() {
  return dummy_store;
}

export function getBaseStores() {
  const baseStore = dummy_store.filter((item) => {
    return item.baseStore === true;
  });
  return baseStore;
}
export function getAssignedStores() {
  const assignedStore = dummy_store.filter((item) => {
    return item.assignedStore === true;
  });
  return assignedStore;
}
