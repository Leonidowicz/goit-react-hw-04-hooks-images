import { useState, useEffect } from 'react';
import './App.css';
import { Searchbar } from './Components/Searchbar/Searchbar';
import { fetchImages } from './Components/Api/Api.js';
import { ImageGalery } from './Components/ImageGallery/ImageGallery';
import { Spinner } from './Components/Loader/Loader';
import { Button } from './Components/Button/Button';
import { Modal } from './Components/Modal/Modal';

export const App = () => {
  const [request, setRequest] = useState('bird');
  const [images, setimages] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);

  const handlerOnSubmit = newRequest => {
    setRequest(newRequest);
    setPage(1);
    setimages([]);
  };
  const handlerOnClick = (link, tags) => {
    setSelectedImage(link);
    setAlt(tags);
  };
  const handlerOnClosedModal = e => {
    if (e.target.getAttribute('class') === 'Overlay' || e.keyCode === 27) {
      setSelectedImage(null);
      setAlt(null);
    }
  };
  const showMore = () => {
    setPage(prev => prev + 1);
  };
  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    fetchImages(request, page).then(data => {
      setimages(prev => [...prev, data.hits].flat());
      setTotal(data.totalHits);
      scroll();
    });
  }, [page, request]);

  return (
    <div className="App-header">
      {selectedImage && (
        <Modal img={selectedImage} alt={alt} cl={handlerOnClosedModal} />
      )}

      <Searchbar handlerOnSubmit={handlerOnSubmit} />
      {images.length === 0 && <Spinner />}

      <ImageGalery
        images={images}
        handlerOnClick={handlerOnClick}
        clMod={handlerOnClosedModal}
      />
      {total > 12 && <Button showMore={showMore} />}
    </div>
  );
};
