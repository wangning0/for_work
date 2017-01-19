import React from 'react';
import Preview from './Preview';

class PreviewList extends React.component {
  static propTypes = {
    loading: React.PropTypes.bool,
    error: React.PropTypes.bool,
    articleList: React.PropTypes.arrayOf(React.PropTypes.object),
    loadArticles:React.PropTypes.func,
    push: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.loadArticles();
  }

  render() {
    const { loading, error, articleLists } = this.props;

    if(error) {
      return <p className="message">Oops, something is wrong</p>
    }

    if(loading) {
      return <p className="message">Loading---</p>
    }

    return (
        <div>
          {articleLists.map(item => {
            return <Preview key={item.id} {...item} push={this.props.push} />
          })}
        </div>
    )
  }
}

export default PreviewList;