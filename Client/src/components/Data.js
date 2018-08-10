import React, { Component } from 'react';
import Highcharts from 'highcharts';
import "./Data.css";
import { Redirect } from 'react-router'

class Data extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      counts: [],
      redirect: false,
      path: null
    }
  }
  componentDidUpdate(prevState){
    if (this.state.categories !== prevState.categories) {
      console.log("componentDidUpdate")
      this.chart();
    }
  }

  // when component mount, fetch data 
  componentDidMount(){
    console.log("componentDidMount")
    this.fetchData();
  }
  fetchData(){
    console.log("fetchData")
    // TODO(me): Figure out the correct url to get the category and subcategory only.
    let url = 'http://localhost:3030/dashboard/?$select[]=Category&$limit=all';
    fetch(url)
      .then(response => response.json())
      .then(json => this.processData(json.data));
  }
  // once data is fetched, process/shape it
  processData(data){
    // TODO(me): shape data!
    let categoriesArray = [];
    let counts = [];
    let dataMap = new Map();
    // console.log("json", data)
    for(let i = 0; i < data.length; i++){
      if(dataMap.has(data[i].Category)){
        let newValue = dataMap.get(data[i].Category)+1;
        dataMap.set(data[i].Category,  newValue)
      } else {
        dataMap.set(data[i].Category, 1) 
      }
    }
    // console.log("dataMap", dataMap)
    // TODO(me): sort the data from large to small
    dataMap.forEach((value, key)=>{
      categoriesArray.push(key);
      counts.push(value);
    });
    this.setState({
      categories: categoriesArray,
      counts: counts
    });
  }

  chart(){
      Highcharts.chart('bar-chart', {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Chat Bot Counts'
        },
        subtitle: {
          text: 'Click on a category for more details'
      },
        xAxis: {
          categories: this.state.categories,
          labels: {
            style: {
              cursor: 'pointer',
              fontSize: '10px'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'chat counts'
          },
          
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        series: [{
          name: 'chats',
          data: this.state.counts
        }]
      });
  }

  handleClick(e){
    // access to e.target here
    let path = e.target.innerHTML;
    path = path.replace("&amp;","%26");
    console.log("path", path);
    this.setState({
      redirect: true,
      path: path
    });
  }
  
  Routing(){
    console.log("path", this.state.path)
    if(this.state.redirect === true){
      return(
        (<Redirect
            to={{
            pathname: "/" + this.state.path
          }} />)
      )
    }
  }
  
  render(){
    console.log("render")
    return(
      <div>
      {/* {JSON.stringify(this.state.categories)}{JSON.stringify(this.state.counts)} */}
      <div id="bar-chart" onClick={(e) => this.handleClick(e)}></div>
      <div>{this.Routing()}</div>
      </div>
    )
  }
}

export default Data;