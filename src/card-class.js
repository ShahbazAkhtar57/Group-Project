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
            menu: props.menu,
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
            rate1:"",
            rate2:"",
            rate3:"",
            review_err: false,
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
        //  gets the users reviews 
           this.setState({
                username1:res.data.reviews[0].user.name,
                username2:res.data.reviews[1].user.name,
                username3:res.data.reviews[2].user.name,
                text1:res.data.reviews[0].text,
                text2:res.data.reviews[1].text,
                text3:res.data.reviews[2].text,
                time1:res.data.reviews[0].time_created,
                time2:res.data.reviews[1].time_created,
                time3:res.data.reviews[2].time_created,
                rate1:res.data.reviews[0].rating,
                rate2:res.data.reviews[1].rating,
                rate3:res.data.reviews[2].rating,
                })
           
             
            })    
       .catch((err) => {
              console.log (err)
              this.setState({
                  review_err: true
              })
            })
}
    
  render() {

    // get the string of distance

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

    //create the rating string in the emoji format 

    var rating_str1 = "";
    var rating_num1 = this.state.rate1;
    for(let x = 0; x < rating_num1; x++){
        rating_str1 += "⭐️";
    }

    var rating_str2 = "";
    var rating_num2 = this.state.rate2;
    for(let x = 0; x < rating_num2; x++){
        rating_str2 += "⭐️";
    }

    var rating_str3 = "";
    var rating_num3 = this.state.rate3;
    for(let x = 0; x < rating_num3; x++){
        rating_str3 += "⭐️";
    }


    var rest_rating_str = "";
    var rest_rating_num = this.state.rating;
    for(let x=0; x < rest_rating_num; x++) {
        rest_rating_str += "⭐️";
    }

    //show N/A for the empty tel string

    var tel = "";
    if(this.state.tel === "") {
        tel = "N/A";
    }
    else {
        tel = this.state.tel;
    }

    //create the date string without the specific time
    
    var date1 = "";
    var time1 = this.state.time1;
    for(let y=0; y < 10; y++){
        date1 += time1[y];
    }
   
    var date2 = "";
    var time2 = this.state.time2;
    for(let y=0; y < 10; y++){
        date2 += time2[y];
    }
   
    var date3 = "";
    var time3 = this.state.time3;
    for(let y=0; y < 10; y++){
        date3 += time3[y];
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
                <p className="more"> Tel: {tel}</p>
                <p className="more"> Rating: <span role="img" aria-label="star">{rest_rating_str}</span> </p>
                <p className="more"> Distance: {str} meters</p>
                <br></br>
                
                <div className="restauant-btn">
                <a className="menu" style={{color:"white"}} href={this.state.menu}>Website</a>
               
                <div className="review-btn">
                    <button  className="primary-btn" onClick={(e) => this.setState({isOpen:true})}>Reviews</button>
                   
                    <Dialog isOpen = {this.state.isOpen} onClose={(e) => this.setState({ isOpen: false})}>

                       { this.state.review_err === false ?
                       (  <div>
                            <div className="review">
                            <h2>Name:{this.state.username1}</h2>
                            <h3>Date: {date1} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                Rating:<span role="img" aria-label="star">{rating_str1}</span>
                            
                            </h3>
                            <h3 style={{color:"black"}}>{this.state.text1}</h3>
                            <br></br>
                            </div>

                            <div className="review">
                            <h2>Name:{this.state.username2}  </h2>
                            <h3>Date: {date2} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                Rating:<span role="img" aria-label="star">{rating_str2}</span>
                            
                            </h3>
                            <h3 style={{color:"black"}}>{this.state.text2}</h3>
                            <br></br>
                            </div>

                            <div className="review">
                            <h2>Name:{this.state.username3}</h2>
                            <h3>Date: {date3} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            Rating:<span role="img" aria-label="star">{rating_str3}</span>
                            
                            </h3>
                            <h3 style={{color:"black"}}>{this.state.text3}</h3>
                            <br></br>
                            </div>
                        </div>) : (<h2 styles={{textAlign:"center"}}> Sorry, there is no review.</h2>)}
                    </Dialog>
                   </div> 
                </div>
            </div>
        </div>

    </div>
      );
  }
    
}
