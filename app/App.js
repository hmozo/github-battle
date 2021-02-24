import React from 'react'
import Hello from './Hello'
import Popular from './components/Popular'

class App extends React.Component{

    render(){
        return (
            <div className='container'>
                <Popular />
            </div>
        )
    }
}

export default App;