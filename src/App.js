import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Companies from './components/Companies/Companies';

class App extends Component {
    state = {
        customers: [],
        commonWords :
            {
                inc : {count: 0, companies: []},
                associates : {count: 0, companies: []},
                ltd : {count: 0, companies: []},
                corporation : {count: 0, companies: []},
                consulting : {count: 0, companies: []},
            },
        btnText: 'Loading...',
        disableBtn: true
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get('http://profiler.markinson.com.au/api/Customer')
            .then(results => {
                this.setState({
                    customers: [...results.data],
                    btnText: 'Show Result',
                    disableBtn: false
                });
            });
    }

     showResultHandler = () => {
        const commonWords = this.state.commonWords;
        const customers = this.state.customers;

         Object.keys(commonWords)
             .map(objKey => {
                 customers.map((el) => {
                     if(el.companyName.toLowerCase().indexOf(objKey) !== -1) {
                         commonWords[objKey].count = commonWords[objKey].count + 1;
                         commonWords[objKey].companies.push(el.companyName);
                     }
                 });
             });
         this.setState({commonWords: {...commonWords}});

     }


  render() {
    return (
      <div className="App">
          <Header/>
          <div className="container well">
              <div>
                  <button className="btn btn-primary" disabled={this.state.disableBtn} onClick={this.showResultHandler.bind(this)}>
                      { this.state.btnText }
                  </button>
                  <hr />
              </div>


              <Companies commonWords={this.state.commonWords}/>
          </div>
      </div>
    );
  }
}

export default App;
