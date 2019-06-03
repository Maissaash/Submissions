import React, { Component } from 'react'
class Video extends Component{
    render(){
    return(
        <div className='video'>

            <iframe width="700" height="450" src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
            <h4>{this.props.video.snippet.title}<br /><br /></h4>
            <h6>{this.props.vi[0].statistics.viewCount} Views<br /><br /></h6>
            <h5>{this.props.video.snippet.channelTitle}<br /><br /></h5>
            <h6>Published on{this.props.video.snippet.publishedAt}<br /><br /></h6>
            <p>{this.props.video.snippet.description}<br /><br /></p>
            
        </div>
    )}
}
export default Video;