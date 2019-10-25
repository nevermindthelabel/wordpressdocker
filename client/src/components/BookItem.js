import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookItem = props => {
  const [imageURL, getImage] = useState('');
  const [author, getAuthorName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(props.book.featured_media);
    const getImageURL = axios.get(
      `http://localhost:8000/wp-json/wp/v2/media/${props.book.featured_media}`
    );
    const getAuthor = axios.get(`/wp-json/wp/v2/users/${props.book.author}`);

    Promise.all([getImageURL, getAuthor]).then(res => {
      getImage(res[0].data.media_details.sizes.full.source_url);
      getAuthorName(res[1].data.name);
      setIsLoaded(true);
    });
  });

  if (isLoaded) {
    return (
      <div>
        <h2>{props.book.title.rendered}</h2>
        <small>
          review by <strong></strong>
        </small>
        <img src={imageURL} alt={props.book.title.rendered} />
        <div
          dangerouslySetInnerHTML={{ __html: props.book.excerpt.rendered }}
        />
      </div>
    );
  } else {
    return <h1>waiting...</h1>;
  }
};

export default BookItem;
