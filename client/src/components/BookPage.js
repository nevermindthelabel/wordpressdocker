import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const BookPage = props => {
  const [book, setBook] = useState({});
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`/wp-json/wp/v2/books/${props.match.params.id}`)
      .then(res => {
        setBook(res.data);
        setIsLoaded(true);
      })
      .catch(error => console.error(error));
  }, []);

  if (loaded) {
    console.log(book)
    return (
      <Fragment>
        <h1>{book.title.rendered}</h1>
        <h3>{book.author}</h3>

      </Fragment>
    );
  } else {
    return <h3>loading...</h3>;
  }
};

export default BookPage;
