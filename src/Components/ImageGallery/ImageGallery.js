import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGalery = ({ images, handlerOnClick }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} handlerOnClick={handlerOnClick} />
    </ul>
  );
};
