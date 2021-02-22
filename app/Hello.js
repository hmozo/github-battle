import React from 'react'

class Hello extends React.Component{
 
    render(){
        return(
            <h2>
                {this.props.header} {this.props.name}

                {this.props.authed === true && 
                    <button onClick={this.props.logout}>Logout</button>}
            </h2>
        
        )
    }
}

export default Hello;