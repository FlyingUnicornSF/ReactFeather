import React, { Component } from 'react';
import Highcharts from 'highcharts';
import "./Data.css";

class Data extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      counts: []
    }
  }
  componentDidUpdate(prevState){
    if (this.state.categories !== prevState.categories) {
      console.log("componentDidUpdate", this.state.categories)
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
    console.log("json", data)
    for(let i = 0; i < data.length; i++){
      if(dataMap.has(data[i].Category)){
        let newValue = dataMap.get(data[i].Category)+1;
        dataMap.set(data[i].Category,  newValue)
      } else {
        dataMap.set(data[i].Category, 1) 
      }
    }
    console.log("dataMap", dataMap)
    // TODO(me): sort the data from large to small
    dataMap.forEach((value, key)=>{
      categoriesArray.push(key);
      counts.push(value);
    });
    this.setState({
      categories: categoriesArray,
      counts: counts
    });
    console.log(Array.isArray(this.state.categories))
  }

  chart(){
      Highcharts.chart('container', {
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
              fontSize: '17px'
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
    console.log("e.target", e.target.innerHTML);
    // this.setState({prescriptionID: e.target.id})
    // // this is another way to XMLHttpRequest
    // // using fetch
    // let url = "/fills/"+e.target.id;
    // fetch(url, {
    //   method: "GET",
    // })
    // // below line is needed because fetch is a promise
    // // if you don't return response, it will hang waiting...
    // .then(response => response.json())
    // .then(response => this.setState({fills: response}))
    // .then(this.setState({show: true}))
  }


  render(){
    console.log("render")
    return(
      <div>
      {/* {JSON.stringify(this.state.categories)}{JSON.stringify(this.state.counts)} */}
      <div id="container" onClick={(e) => this.handleClick(e)}></div>
      </div>
    )
  }
}

export default Data;