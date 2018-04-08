import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Companies from './components/Companies/Companies';
import Collapsible from './containers/Collapsible/Collapsible';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            commonWords :
                {
                    institute : {count: 0, companies: []},
                    associates : {count: 0, companies: []},
                    ltd : {count: 0, companies: []},
                    corporation : {count: 0, companies: []},
                    consulting : {count: 0, companies: []},
                },
            btnText: 'Loading...',
            disableBtn: true
        }
    }

    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        axios.get('http://profiler.markinson.com.au/api/Customer')
            .then(results => {
                const customers = results.data;
                this.setState({
                    customers,
                    btnText: 'Show Result',
                    disableBtn: false
                });
            })
            .catch(err => console.log(`Error occur while fetching data : ${err}`));
    }

    showResultHandler = () => {
        const  { commonWords, customers } = this.state;
        Object.keys(commonWords)
            .map(objKey => {
                customers.map((el) => {
                    if(el.companyName.toLowerCase().indexOf(objKey) !== -1) {
                        commonWords[objKey].count = commonWords[objKey].count + 1;
                        commonWords[objKey].companies.push(el.companyName);
                    }
                });
            });
        this.setState({
            commonWords: {...commonWords},
            disableBtn: true
        });

    }

  render() {
        const { commonWords, btnText } = this.state;
        const listings = Object.keys(commonWords).map((objkey, i) => (
            <Collapsible key={i} title={objkey} count={commonWords[objkey].count}>
                <Companies companies={commonWords[objkey].companies}/>
            </Collapsible>
        ));
    return (
      <div>
          <Header/>
          <div className="container well">
              <div>
                  <button className="btn btn-primary"
                          disabled={this.state.disableBtn}
                          onClick={this.showResultHandler.bind(this)}>
                      { btnText }
                  </button>
                  <hr />
              </div>

              <div>
                  {
                      listings
                  }
              </div>

          </div>
      </div>
    );
  }
}

export default App;
