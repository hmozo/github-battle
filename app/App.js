import React from 'react'
import Hello from './Hello'
import Battle from './components/Battle'
import Popular from './components/Popular'

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