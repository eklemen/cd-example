import { useCallback, useContext, useEffect } from 'react';
import { compDataStore } from './compDataStore';
import actions from './actionConstants';

/**
 * useCompData hook to manage component data state in context
 * @param  {string} name the name of the compData object in the store
 * @param initialValue
 */
const useCompData = (name, initialValue = {}) => {
  if (!name || typeof name !== 'string') {
    throw Error(`Must provide a name to useCompData(name), got ${name}`);
  }
  const { state, dispatch } = useContext(compDataStore);

  /**
   * Get compData from another object by name
   * @param  {string} compName key of compData to retrieve
   */
  const getCompData = compName => state[compName] || {};

  /**
   * Set Data into the compData object
   * @param  {Object} payload data to merge into compData.name
   * @param  {string} [compName=name] name of other (than current) compData object to save data to
   */
  const setData = useCallback((payload, compName = name) => {
    if (typeof compName !== 'string') {
      throw Error(
        'Second parameter to setData(object, [string]) must be a string.'
      );
    }
    return dispatch({ type: actions.SET_DATA, name: compName, payload });
  }, [name, dispatch]);

  useEffect(() => {
    if (initialValue !== undefined && Object.keys(getCompData(name)).length) {
      setData(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CAUTION: This will be reset ALL compDatas
  /**
   * Delete all compData and reset store to empty
   */
  const clearStore = () => dispatch({ type: actions.CLEAR_STORE });

  /**
   * Used to populate data from another source (like localstorage)
   * @param {object} payload any object of data to be rehydrated into state
   */
  const _rehydrate = payload => dispatch({ type: actions.REHYDRATE, payload });

  /**
   * Set Data into the compData object
   * @param  {string} [compName=name] name of other (than current) compData object to save data to
   */
  const clearComp = (compName = name) => {
    return dispatch({ type: actions.CLEAR_COMP, name: compName });
  };
  return {
    setData,
    compData: getCompData(name),
    getCompData,
    clearStore,
    clearComp,
    _rehydrate
  };
};

export default useCompData;
