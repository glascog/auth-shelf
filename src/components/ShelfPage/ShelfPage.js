import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';


function ShelfPage() {

  const dispatch = useDispatch();
  const store = useReduxStore();
  useEffect(() => {
    dispatch({type: 'FETCH_SHELF_ITEMS'});
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
    <div>{store.shelf.map((item, index) => (
      <div key={index}>
        <img src={item.url} />
          <p>{item.description}</p>
      </div>
    ) )}
      </div>
    
    </div>
  );
}

export default ShelfPage;
