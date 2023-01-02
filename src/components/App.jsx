import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { PixabayApi } from './API/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
const myGallery = new PixabayApi();
export class App extends Component {
  state = {
    images: null,
    isLoading: false,
    loadMoreVisible: false,
    error: null,
  };

  searchImages = async searchq => {
    try {
      this.setState({ isLoading: true, erorr: null });
      myGallery.search = searchq;
      const { hits, totalHits } = (await myGallery.getPhotos()).data;
      const images = hits;
      myGallery.maxPages = Math.ceil(totalHits / 12);
      console.log(images);
      this.setState({
        images: images,
        loadMoreVisible: myGallery.ShowLoadMore(),
      });

      return true;
    } catch {
      this.setState({ error: 'No pictures were found for this search' });
      return false;
    } finally {
      this.setState({ isLoading: false });
    }
  };
  loadMore = async () => {
    try {
      this.setState({ isLoading: true, erorr: null });
      myGallery.incPage();
      const images = (await myGallery.getPhotos()).data.hits;
      console.log(images);
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
      this.setState({
        loadMoreVisible: myGallery.ShowLoadMore(),
      });
      return true;
    } catch {
      this.setState({ error: 'No pictures were found for this search' });
      return false;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { searchImages, loadMore } = this;
    const { isLoading, images, loadMoreVisible } = this.state;

    return (
      <div>
        <Loader isLoading={isLoading} />
        <Searchbar onSubmit={searchImages} />
        <ImageGallery images={images} />
        {loadMoreVisible && <Button onClick={loadMore} />}
      </div>
    );
  }
}
