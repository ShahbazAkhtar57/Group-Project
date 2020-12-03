import React, {Component} from 'react';

let dialogStyles = {
    width: "800px",
    height: "510px",
    maxwidth: "100%",
    margin: "0 auto",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: "999",
    backgroundColor: "#eee",
    padding: "10px 20px 40px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    overflow:"auto"
};

let dialogCloseButtonStyles = {
    marginBottom: "15px",
    padding: "3px 8px",
    cursor: "pointer",
    borderRadius: "50%",
    border: "none",
    width: "40px",
    height: "40px",
    fontWeight: "bold",
    alignSelf: "flex-end"
};

class Dialog extends Component {

    render() {

        let dialog = (
            <div style={dialogStyles}> 

                <button style={dialogCloseButtonStyles} onClick={this.props.onClose}><span role="img" aria-label="close">❌</span></button>
                <div>{this.props.children}</div>
                
            </div>
        )

        if(! this.props.isOpen) {
            dialog = null;
        }
        return (
           <div>
               {dialog}
           </div>
           
        );
    }

}

export default Dialog;