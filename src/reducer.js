const reducer = (state = 10, { type, payload = 100 } = {}) => {
  switch (type) {
    case 'SOME_ACTION':
      return state + payload;
    default:
      return state;
  }
};

export default reducer;
