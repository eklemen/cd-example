### useCompData

```jsx
import useCompData from '../context/compData/useCompData';

const Home = () => {
  // The `name` will create an object namespace in CompData context
  const {setData, compData, getCompData} = useCompData('Home');
  return(
    <div>
     /* Setting Data */
      <button
        onClick={
          // setData by default saves to the name provided to the hook
          () => { setData({fruit: 'banana', /*any other data*/}) }
        }
      >
      <button
        onClick={
          // you can set data into another name too as 2nd param
          // without needing to import or use a hook
          () => { setData({quantity: 5}, 'ShoppingCart') }
        }
      >
      
      /* Getting Data */
      /* Data lives in the `compData` object
       * by default it is using the name provided `state.Home` 
       */
      <pre>
        compData.banana = {compData.banana}
      </pre>
      /* Get data from another compData with getCompData */
      <pre>
        username = {getCompData('Profile').username}
      </pre>
    </div>
    
      /* Clearing Data */
      /* clearComp and clearStore are returned by the hook
       */
      <button
        onClick={
          // This will reset compData to {}
          clearComp
        }
      >
      <button
        onClick={
          // reset another compData by name
          () => clearComp('ShoppingCart')
        }
      >
      /* Clear whole store for ALL comp data objects */
      /* WARNING: this wipes all data - use case logout */
      <button
        onClick={
          // This will reset whole store to {}
          clearStore
        }
      >
  );
}
