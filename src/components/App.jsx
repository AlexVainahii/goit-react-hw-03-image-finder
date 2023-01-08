import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { PixabayApi } from '../Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
const myGallery = new PixabayApi();
export class App extends Component {
  state = {
    searchWord: '',
    images: null,
    isLoading: false,
    loadMoreVisible: false,
    error: null,
    page: 1,
  };
  searchImages = searchW => {
    this.setState({ searchWord: searchW });
  };
  getData = async noPush => {
    try {
      this.setState({
        loadMoreVisible: false,
        isLoading: true,
        erorr: null,
      });
      if (noPush) {
        this.setState({
          images: null,
        });
        myGallery.search = this.state.searchWord;
      }
      const { hits, totalHits } = (await myGallery.getPhotos()).data;
      const images = hits.map(image => {
        const { id, webformatURL, largeImageURL, tags } = image;
        return {
          id,
          webformatURL,
          largeImageURL,
          tags,
        };
      });
      if (noPush) {
        myGallery.maxPages = Math.ceil(totalHits / 12);
        this.setState({
          images: images,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
      }
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

  loadMore = () => {
    this.setState({
      page: myGallery.incPage(),
      loadMoreVisible: myGallery.ShowLoadMore(),
    });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.getData(false);
    }
    if (prevState.searchWord !== this.state.searchWord) {
      this.getData(true);
    }
  }

  render() {
    const { searchImages, loadMore } = this;
    const { isLoading, images, loadMoreVisible } = this.state;

    return (
      <div>
        <Searchbar onSubmit={searchImages} />
        {images && <ImageGallery images={images} />}
        <Loader isLoading={isLoading} />
        {loadMoreVisible && <Button onClick={loadMore} />}
      </div>
    );
  }
}
