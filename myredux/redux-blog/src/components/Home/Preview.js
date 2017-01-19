import React from 'react';

class Preview extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        link: React.PropTypes.string,
        push: React.PropTypes.func
    };

    handleNavigate (id, e) {
        // 组织原生链接的跳转
        e.preventDefault();

        // 使用 react-router-redux提供方的方法来实现跳转 以便state有路由信息
        this.props.push(`/detail/${id}`);
    }

    render() {
        return (
            <article className="article-preview-item">
                <h1 className="title">
                    <a href={`/detail/${this.props/id}`} onclick={this.handleNavigate.bind(this, this.props.id)}>
                        {this.props.title}
                    </a>
                </h1>
                <span className="date">{this.props.date}</span>
                <p className="desc">{this.props.description}</p>
            </article>
        )
    }
}

export default Preview;