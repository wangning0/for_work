import React, {Component} from 'react';
import Preview from './Preview';

class PreviewList extends Component {
  static propTypes = {
    articleList: React.Proptypes.arrayOf(React.propTypes.object)
  };


  render() {
    return this.props.articleList.map(item => (
      <Preview {...item} key={item.id} />
    ))
  }
}

export default PreviewList;