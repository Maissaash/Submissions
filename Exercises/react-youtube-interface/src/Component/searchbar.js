import React, { Component } from 'react'
import { directive } from '@babel/types';
import youtube from '../assets/youtube.png'
class SearchBar extends Component{
  constructor(props){
      super(props); 
    this.state={
        seek:''
    };
  }
    
    search = (x) =>{
        this.setState({
            seek: x.target.value
        });
        console.log(this.state.seek)
    };
   
    
    render(){
    return(
        <div className='searchbar'>
            <img src={youtube}></img>
            <input type="text" onChange={this.search} />
            <button onClick={this.props.x(this.state.seek)} ></button>
            <div className='Notivication'>
                    <a href="#" id='a1'></a>
                    <a href="#" id='a2'></a>
                    <a href="#" id='a3'></a>
                    <a href="#" id='a4'></a>
                </div>
    </div>)}
}

export default SearchBar;