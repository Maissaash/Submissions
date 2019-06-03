import React, {Component} from 'react';
import './App.css';
import SearchBar from './Component/searchbar'
import Video from './Component/video'
import Restvideo from './Component/Reastvideos'
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos:[],
            restvideos:[],
            des:[],
            views:[]
        }

    }
    click = (searchword) => async evt=>{
        evt.preventDefault(); 
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchword}&key=AIzaSyDE7vUR7bXJRLXFP-2xamHm47MHniZX_3Y`)
        const results = await response.json();
        const response2 = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=21&relatedToVideoId=${results.items[0].id.videoId}&type=video&key=AIzaSyDE7vUR7bXJRLXFP-2xamHm47MHniZX_3Y`)
        const results2 = await response2.json();
        const vid = results.items.map(tt=>{return tt.id.videoId});
        const m = vid.toString()

        const response3 = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${m}%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=AIzaSyDE7vUR7bXJRLXFP-2xamHm47MHniZX_3Y`)
    
        const results3 = await response3.json();
        this.setState(
            {
                des:results.items,
                videos: results.items,
                restvideos: results2.items,
                views:results3.items
            }
        )
        //console.log(this.state.restvideos)
        //console.log(this.state.videos)
        console.log(this.state.views)
    };

    render() {
        return (
            <div className="App">
                <SearchBar x={this.click} />
                <div className='content'>
                        {(this.state.videos.length>0)&&
                        <Video video = {this.state.videos[0]} vi={this.state.views} />}
                        <Restvideo videos={this.state.views} vii= {this.state.views} />
               </div>
            </div>
        );
    }
}

export default App;
