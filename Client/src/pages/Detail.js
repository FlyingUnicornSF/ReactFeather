import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import "./Detail.css";

class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      sentimentAverage: null,
      FacebookMsgr: 0,
      Web: 0,
    }
  }
  componentDidUpdate(prevState){
    if (this.state.sentimentAverage !== prevState.sentimentAverage) {
      this.chart();
    }
  }

  componentDidMount() {
    
    let path = this.props.match.url.slice(1)
    let category = path;
    // console.log('category', category)
    this.fetchDetail(category);
    // http://localhost:3030/dashboard/?Category=Store%20Questions&$limit=all
    // http://localhost:3030/dashboard/?Category=Store%20Questions&$limit=all&$sort[Date]=-1&Date[$gte]=2018-01-17
  }

  fetchDetail(category){
    let url = 'http://localhost:3030/dashboard/?Category=' + category + '&$limit=all&$sort[Date]=-1';
    fetch(url)
      .then(response => response.json())
      .then(json => this.processData(json.data))
      // .then(data => console.log(data));
  }

  processData(data){
    let botChannel = new Map();
    let sentimentTotal = 0;
    for( let i = 0; i < data.length; i++){
      console.log('botChannel', botChannel)
      if( botChannel.has(data[i].BotChannel) ){
        let newValue = botChannel.get(data[i].BotChannel)+1;
        botChannel.set(data[i].BotChannel,  newValue)
      } else {
        console.log('botChannel', botChannel)
        botChannel.set(data[i].BotChannel,  1)
      }
      sentimentTotal += data[i].Sentiment;
    }
    console.log("botChannelMap", botChannel.get("Web"))

    botChannel.forEach((value, key)=>{
      const name = key;
      this.setState({[name]: value})
      console.log(this.state)
    });
    this.setState({
      sentimentAverage: (sentimentTotal/data.length).toFixed(2)
    });
  }

  chart(){
    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 250
      },
      title: {
        text: 'Bot Channel Source'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Facebook',
          y: this.state.FacebookMsgr,
          sliced: true,
          // selected: true
        }, {
          name: 'Web',
          y: this.state.Web
        }]
      }]
    });
  }
  
  GoHomePage(){
    window.location.href = "/";
  }
    // <pre>
    // { JSON.stringify(this.props, null, 2) }
    // </pre>

  render(){
    return(
      <div className="row">
        <Table responsive id="table">
          <thead>
            <tr>
              <td>Averate Sentiment</td>
              <td>Bot Channel</td> 
              {/* <td>something</td> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="sentiment-average">{this.state.sentimentAverage}<ProgressBar now={((this.state.sentimentAverage-(-1))/2*100).toFixed(2)} /></td>
              <td><div id='container' className='pie-chart'></div></td> 
              {/* <td>something</td> */}
            </tr>
          </tbody>
        </Table>
        <Button bsSize="large" onClick={this.GoHomePage}>Back to Home Page</Button>
      </div>
    )
  }
}

export default Detail;