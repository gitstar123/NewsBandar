import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner  from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)} News NB`;
  }
  async componentDidMount() {
    this.props.setprogress(10);
    this.setState({
      loading: true
    });
    var response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=46d99f2442664468808397bd2f98ca15&page=${this.state.page}&pageSize=${this.props.pageSize}`
    );
    var data = await response.json();
    this.setState({ articles: data.articles, totalResults: data.totalResults, loading: false });
    this.props.setprogress(100);
  }
  // Next_page = async () => {
  //     this.setState({
  //       loading: true
  //     });
  //     var response = await fetch(
  //       `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=46d99f2442664468808397bd2f98ca15&page=${
  //         this.state.page + 1
  //       }&pageSize=${this.props.pageSize}`
  //     );
  //     var data = await response.json();
  //     this.setState({
  //       articles: data.articles,
  //       page: this.state.page + 1,
  //       loading: false
  //     });
  // };
  // Prev_page = async () => {
  //   this.setState({
  //     loading: true
  //   });
  //   var response = await fetch(
  //     `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=46d99f2442664468808397bd2f98ca15&page=${
  //       this.state.page - 1
  //     }&pageSize=${this.props.pageSize}`
  //   );
  //   var data = await response.json();
  //   this.setState({
  //     articles: data.articles,
  //     page: this.state.page - 1,
  //     loading: false
  //   });
  // };
  fetchMoreData = async () => {
    this.props.setprogress(10);
    var response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=46d99f2442664468808397bd2f98ca15&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`
    );
    var data = await response.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      page: this.state.page + 1,
      loading: false
    });
    this.props.setprogress(100);
  }
  render() {
    return (
      <div>
        <h2 className="text-center" style={{margin: "6%"}}>{this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map((e) => {
            return (
              <div className="col-md-4" key={e.url}>
                <NewsItems
                  title={e.title ? e.title : ""}
                  description={e.description ? e.description : ""}
                  imgUrl={
                    e.urlToImage
                      ? e.urlToImage
                      : "https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-img-file-document-icon-png-image_892886.jpg"
                  }
                  published={e.publishedAt}
                  author={e.author}
                  source={e.source.name}
                  newsUrl={e.url ? e.url : "https://www.google.com"}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
News.defaultProps = {
  country: 'us',
  pageSize: '10',
  category: 'general'
};