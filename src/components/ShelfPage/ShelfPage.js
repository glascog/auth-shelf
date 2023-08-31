import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { useState } from 'react';
import axios from 'axios';


function ShelfPage() {

  const [imgUrl, setImgUrl] = useState('');
  const [imgDescription, setImgDescription] = useState('');

  const dispatch = useDispatch();
  const store = useReduxStore();
  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF_ITEMS' });
  }, [dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(imgUrl, imgDescription)

    let shelfItem = {
      description: imgDescription,
      image_url: imgUrl
    }
    axios.post('/api/shelf', shelfItem)
      .then(response => {
        console.log('post was successful', response)
        dispatch({ type: 'FETCH_SHELF_ITEMS' })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleDelete = (item) => {
    let imageId = item.id;
    let userId = store.user.id;
    axios.delete(`/api/shelf/${imageId}/${userId}`)
      .then(response => {
        console.log('delete worked!', response)
      })
      .catch(error => {
        console.error("error!", error)
      })
  }


  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={onSubmit}>
        <input type='text'
          placeholder='image url'
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)} />
        <input type='text'
          placeholder='image description'
          value={imgDescription}
          onChange={(event) => setImgDescription(event.target.value)} />
        <button type='submit'>Submit</button>
      </form>

      <p>All of the available items can be seen here.</p>
      <div>{store.shelf.map((item, index) => (

        <div key={index}>
          <img style={{ width: 200 }} src={item.image_url} />
          <p>{item.description}</p>
          {store.user.id == item.user_id && <button onClick={() => handleDelete(item)}>Delete</button>}
        </div>
      ))}
      </div>

    </div>
  );
}

export default ShelfPage;
