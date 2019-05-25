import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


/* const App = () => 
{

    window.navigator.geolocation.getCurrentPosition(
         (position) => console.log(position),
         (err) => console.log(err) 
    );

    return <div>Lat : </div> 
    
} */

class App extends React.Component {

/*     constructor(props) {        
        super(props);  
        
        //ONLY TIME we directly assign value to state
        this.state = { lat: null, errorMessage:''};
               
    }
 */

    //SAME AS CALLING FROM CONSTRUCTOR
    state = { lat: null, errorMessage:''};

    componentDidMount() 
    {
    
        window.navigator.geolocation.getCurrentPosition(
            (position) => 
                    { 
                        //console.log(position)
                        //WE CALLED setState
                        this.setState({lat:position.coords.latitude});
                    },
            (err) => {
                        //console.log(err) ;
                        this.setState({errorMessage:err.message});
                    }
       );

    }


    renderContent() {
        /*  return (
            <div>
                <div>Lat : {this.state.lat} </div>
                <div>{this.state.errorMessage} </div>
            </div>            
        ); */

        if (this.state.errorMessage && !this.state.lat) {
            return <div>err: {this.state.errorMessage}</div>;
                   
                
        }

        if (!this.state.errorMessage && this.state.lat) {
            //return <div>Lat: {this.state.lat}</div>;
            return  <SeasonDisplay lat={this.state.lat} />
                    
                 
        } 

        //return <div>Loading..</div>;
        return <Spinner message="accept location request please.."/>;

    }

    render() {

            return (
                    <div className="border red">
                        {this.renderContent()}
                    </div>
            );
     
    }
}

ReactDOM.render(
    <App/>,document.querySelector('#root')
);