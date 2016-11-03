import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props;
    dispatch(fetchPostsIfNeed(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeed(selectedReddit))
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'fronted' ]}/>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocalTimeString()},
              {'  '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
               Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts //取别名
  } = postsByReddit[selectedReddit] || {
    isFetching: false,
    items: []
  }

  return {
    selectedReddit,
    isFetching,
    lastUpdated,
    posts
  }
}

export default conncet(mapStateToProps)(App)