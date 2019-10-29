import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookItem = props => {
  const [imageURL, getImage] = useState('');
  const [author, getAuthorName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getImageURL = axios.get(
      `/wp-json/wp/v2/media/${props.book.featured_media}`
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
          review by <strong>{author}</strong>
        </small>
        <img style={{ width: '75%' }} src={imageURL} alt={props.book.title.rendered} />
        <div
          dangerouslySetInnerHTML={{ __html: props.book.excerpt.rendered }}
        />
        <Link to={`/book/${props.book.id}`}>Read Review</Link>
        <hr />
      </div>
    );
  } else {
    return <h1>waiting...</h1>;
  }
};

export default BookItem;
