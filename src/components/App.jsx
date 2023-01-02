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
    page: 1,
  };

  searchImages = async searchq => {
    try {
      this.setState({ isLoading: true, erorr: null });
      myGallery.search = searchq;
      const { hits, totalHits } = (await myGallery.getPhotos()).data;
      const images = hits;
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

  getData = async () => {
    try {
      this.setState({ isLoading: true, erorr: null });
      const images = (await myGallery.getPhotos()).data.hits;
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
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
      this.getData();
    }
  }

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
