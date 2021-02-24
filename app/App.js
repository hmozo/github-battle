import React from 'react'
import Hello from './Hello'
import Battle from './components/Battle'

class App extends React.Component{

    render(){
        return (
            <div className='container'>
                <Battle />
            </div>
        )
    }
}

export default App;