import React from "react"

export default class Hover extends React.Component{
    state= {
        hovering: false, 
    }

    mouseOver= ()=>{
        this.setState({
            hovering: true
        })
    }
    
    mouseOut= ()=>{
        this.setState({
            hovering: false
        })
    }

    render(){
        const { children }= this.props
        const { hovering }= this.state
        return(
            <div 
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
            >
                {children(hovering)}
            </div>
        )
    }
}
