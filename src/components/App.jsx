import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { PixabayApi } from './Api';
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
  getData = async () => {
    try {
      this.setState({
        loadMoreVisible: false,
        images: null,
        isLoading: true,
        erorr: null,
      });
      myGallery.search = this.state.searchWord;
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
      myGallery.maxPages = Math.ceil(totalHits / 12);
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

  pushData = async () => {
    try {
      this.setState({ isLoading: true, erorr: null, loadMoreVisible: false });
      const images = (await myGallery.getPhotos()).data.hits;
      const makeImages = images.map(image => {
        const { id, webformatURL, largeImageURL, tags } = image;
        return {
          id,
          webformatURL,
          largeImageURL,
          tags,
        };
      });
      this.setState(prevState => ({
        images: [...prevState.images, ...makeImages],
      }));

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
      this.pushData();
    }
    if (prevState.searchWord !== this.state.searchWord) {
      this.getData(this.searchWord);
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
