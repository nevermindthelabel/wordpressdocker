import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import axios from 'axios';

const Books = () => {

  const [bookState, setBookState] = useState([]);
  const [loading, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get('/wp-json/wp/v2/books')
      .then(res => setBookState(res.data))
      .then(() => setIsLoaded(true))
      .catch(err => console.error(err.message));
  }, []);

  if (loading) {
    return (
      <div>
        {bookState.map(book => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    );
  }
  return <h3>Wait for it...</h3>;
};
export default Books;
