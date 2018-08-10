import React, { Component } from 'react';
import Highcharts from 'highcharts';
import "./Detail.css";
import { Table } from 'react-bootstrap';

class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      sentimentAverage: null,
      botChannelSource: null
    }
  }
  componentDidUpdate(prevState){
    if (this.state.sentimentAverage !== prevState.sentimentAverage) {
      console.log("componentDidUpdate", this.state.botChannelSource)
      this.chart();
    }
  }

  componentDidMount() {
    console.log(this.props.match.path)
    this.fetchDetail(this.props.match.path);
    // http://localhost:3030/dashboard/?Category=Store%20Questions&$limit=all
    // http://localhost:3030/dashboard/?Category=Store%20Questions&$limit=all&$sort[Date]=-1&Date[$gte]=2018-01-17
  }

  fetchDetail(){
    let url = 'http://localhost:3030/dashboard/?Category=Store%20Questions&$limit=all&$sort[Date]=-1';
    fetch(url)
      .then(response => response.json())
      .then(json => this.processData(json.data))
      // .then(data => console.log(data));
  }

  processData(data){
    console.log('data', data)
    let botChannel = new Map();
    let sentimentTotal = 0;
    for( let i = 0; i < 20; i++){
      if( botChannel.has(data[i].BotChannel) ){
        let newValue = botChannel.get(data[i].BotChannel)+1;
        botChannel.set(data[i].BotChannel,  newValue)
      } else if(!botChannel.has(data[i].BotChannel)){
        botChannel.set(data[i].BotChannel,  1)
      }
      sentimentTotal += data[i].Sentiment;
    }
    console.log(botChannel)
    this.setState({
      sentimentAverage: sentimentTotal/data.length, 
      botChannelSource: botChannel
    });
  }

  chart(){
    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in January, 2018'
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
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Web',
          y: 11.84
        }]
      }]
    });
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
              <td>something</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.sentimentAverage}</td>
              <td><div id='container'></div></td> 
              <td>something</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Detail;