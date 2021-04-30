import React, { useState, useReducer } from 'react';

const initialState = {
  props: ''

}


export const Context = React.createContext();

const reducer = (state, action) => {
  if (action.type === 'PROPS') {
    return {
      ...state,
      props: action.props
    }
  }

  return state
}


const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default Store