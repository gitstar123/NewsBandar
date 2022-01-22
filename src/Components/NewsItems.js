import React, { Component } from 'react'

export class NewsItems extends Component {
    
    render() {
        let {title, description, imgUrl, newsUrl, author, published, source} = this.props;
        var d = new Date(published);
        return (
            <div>
                <div className="card my-4">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"50%", zIndex: "1"}}>
                {source}
                </span>
                    <img src={imgUrl} className="card-img-top" alt=""/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">Author: {author?author:"unknown"}, <br/> Published At: {d.toGMTString()}</small></p>
                            <a href={newsUrl} className="btn btn-sm btn-primary" target="_blank" rel="noreferrer">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItems

