import React, {Component} from "react";
import Dialog from "./Dialog";
import axios from "axios";

export default class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            img:props.img,
            name: props.name,
            location: props.location,
            type: props.type,
            tel: props.tel,
            rating: props.rating,
            distance: props.distance,
            isOpen: false,
            username1:"",
            username2:"",
            username3:"",
            text1:"",
            text2:"",
            text3:"",
            time1:"",
            time2:"",
            time3:"",
        }
    }
  
componentDidMount () {
//const[review,setReview] = this.state("")

 axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.state.id}/reviews`, {
  headers: {
   Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
},

})
       .then((res) => {
              console.log(res.data)
        //  setReview(res.data);
           this.setState({
                username1:res.data.reviews[0].user.name,
                username2:res.data.reviews[1].user.name,
                username3:res.data.reviews[2].user.name,
                text1:res.data.reviews[0].text,
                text2:res.data.reviews[1].text,
                text3:res.data.reviews[2].text,
               time1:res.data.reviews[0].time_created,
               time2:res.data.reviews[1].time_created,
               time2:res.data.reviews[2].time_created,

                })
             //   console.log(this.state.text1);    

            //console.log(res.data.review[0].id)
             
            })    
}
    
  render() {



    var newD = this.state.distance.toString();
    var str = "";
    
    for (let i = 0; i < newD.length; i++){
        if(newD[i] !== ".") {
             str += newD[i];
        }
        else if (newD[i] === "."){
            break;
        }
    }
   
     



      return (
        <div class="card">

        <div className="card-image">
           {this.state.img !== "" ? (<img src={this.state.img} alt="Restaurant" />) : (<img src="https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1573133725500-Y5PCN0V04I86HDAT8AT0/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/WBC_7095.jpg?format=2500w" alt="Sample" />)} 
           
            {/* <img src={props.img} alt="Restaurant" /> */}
        </div>
        <div class="card-body">
            <div class="card-date">
                
                <h1 className = "title">
                    {this.state.name}
                </h1>
                <h2>
                    {this.state.location}
                </h2>
                <p className="more"> Type: {this.state.type} </p>
                <p className="more"> Tel: {this.state.tel}</p>
                <p className="more"> Rating: <span role="img" aria-label="star">⭐️</span> {this.state.rating} </p>
                <p className="more"> Distance: {str} meters</p>
                <br></br>
                
                <div>
                    <button  className="primary-btn" onClick={(e) => this.setState({isOpen:true})}>Reviews</button>
                   
                    <Dialog isOpen = {this.state.isOpen} onClose={(e) => this.setState({ isOpen: false})}>
                        <h1>{this.state.username1}</h1>
                        <h2>{this.state.text1}, {this.state.time1}</h2>
                        <br></br>
                        <h1>{this.state.username2}</h1>
                        <h2>{this.state.text2}, {this.state.time2}</h2>
                        <br></br>
                        <h1>{this.state.username3}</h1>
                        <h2>{this.state.text3}, {this.state.time3}</h2>
                        <br></br>
                    </Dialog>
                    
                </div>
            </div>
        </div>

    </div>
      );
  }
    
}
