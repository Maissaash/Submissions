import React, { Component } from 'react'
class Restvideo extends Component{
    render(){
    console.log('this.props.videos ',this.props.videos)
    return(
           <div className='restvideo'>
           
               {
                this.props.videos.map(video=> 
                <div className='kl'>

                    <iframe className='pp' width="200" height="150" src={`https://www.youtube.com/embed/${video.id.videoId}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                        
                    </iframe>
                    <div className="restvideoscss">
                        <h4>{video.snippet.title}</h4>
                        <h5><br />{video.snippet.channelTitle}</h5>
                        <h6><br />{video.statistics.viewCount} Views</h6>
                        {/* <h3>Published on{video.snippet.publishedAt}</h3> */}
                    </div>  
                </div>
                   
                   )
                   
                
           }
             
           </div>
    )}
        
}
export default Restvideo;