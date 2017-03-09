/**
 *  @react-redux 分析
 * 
 *  react-redux 顾名思义 提供了React与Redux之间的绑定，也就是我们实际上运用的 connect Provider   
 * 
 */

/**
 * Provider 
 *  在constructor中 拿到props中的store，并挂载到当前的实例中，同时定义了getChildContext
 *  方法，该方法定义了自动沿组件向下传递的特殊的props
 * 
 * 在生产环境下，如果发现store发生了改变，会报出warn
 */

export default class Provider extends Component {
  getChildContext() {
    return { store: this.store, storeSubscription: null }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    return Children.only(this.props.children)
  }
}

if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    const { store } = this
    const { store: nextStore } = nextProps

    if (store !== nextStore) {
      warnAboutReceivingStore()
    }
  }
}

/**
 * connect
 * 
 *  conncet 函数本身返回名为wrapWithConnect的函数，而这个函数才是真正用来装饰react组件的。
 *          而在我们装饰一个React组件时，其实就是把组件在Connect类的render方法中进行渲染，
 *          并获取connect中传入的各种额外数据
 *  
 */

