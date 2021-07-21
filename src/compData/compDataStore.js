import React, { createContext, useReducer } from 'react';
import actions from './actionConstants';
// import { lfCompDataStore } from '../contextPersist/stores';

const initialState = {};
const compDataStore = createContext(initialState);
const { Provider } = compDataStore;

const CompDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actions.SET_DATA:
      case actions.INIT_COMP_DATA:
        const updatedComp = {
          ...state[action.name],
          ...action.payload
        };
        // lfCompDataStore
        //   .setItem(action.name, updatedComp)
        //   .catch(e => console.log('Failed to save to indexeddb', e));
        return {
          ...state,
          [action.name]: updatedComp
        };
      case actions.CLEAR_COMP:
        // lfCompDataStore
        //   .setItem(action.name, {})
        //   .catch(e => console.log('Failed to clear item in indexeddb', e));
        return {
          ...state,
          [action.name]: {}
        };
      case actions.REHYDRATE:
        return {
          ...state,
          ...action.payload
        };
      case actions.CLEAR_STORE:
        // lfCompDataStore.clear();
        return {};
      default:
        throw new Error('Something went wrong in the compDataStore.');
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { compDataStore, CompDataProvider };
