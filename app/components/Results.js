import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers,FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
//import { RuntimeGlobals } from 'webpack'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'


function ProfileList({ profile }){
    return(
        <ul className='card-list'>  
            <li>
                <FaUsers color='rgb(239, 115, 155)' size={22} />
                {profile.name}
            </li>  
            <li>
                <Tooltip text="User's location" >
                    <FaCompass color='rgb(144, 115, 255)' size={22} />
                    {profile.location}
                </Tooltip>
            </li>
                    
            <li>
                <Tooltip text="User's company">
                    <FaBriefcase color='#795548' size={22} />
                    {profile.company}
                </Tooltip>
            </li>
            <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                {profile.followers && profile.followers.toLocaleString()} following
            </li>
        </ul>
    )
}



ProfileList.propTypes= {
    profile: PropTypes.object.isRequired
}

export default class Results extends React.Component{
    state= {
        winner: null,
        loser: null,
        error: null,
        loading: true
    }

    componentDidMount(){
        const { playerOne, playerTwo }= queryString.parse(this.props.location.search)

        battle([ playerOne, playerTwo ])
            .then(players=>{
                console.log('data: ', players)
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({ message })=>({
                error: message,
                loading: false
            }))
    }

    render(){

        const { winner, loser, error, loading }= this.state

        if(loading===true){
            return <Loading />
        }

        if(error){
            return(
                <p className='center-text error'>{error}</p>
            )
        }

        return(
            <React.Fragment>
                <div className='grid space-around container-sm'>
                    <Card 
                        header= {winner.score===loser.score?'Tie':'Winner'}
                        subheader= {`Score: ${winner.score.toLocaleString()}`}
                        avatar= {winner.profile.avatar_url}
                        href= {winner.profile.html_url}
                        name= {winner.profile.login}
                    >
                        <ProfileList profile= {winner.profile} />
                    </Card>
                    <Card
                        header= {winner.score===loser.score?'Tie':'Loser'}
                        subheader= {`Score: ${loser.score.toLocaleString()}`}
                        avatar= {loser.profile.avatar_url}
                        href= {loser.profile.html_url}
                        name= {loser.profile.login}
                    >
                        <ProfileList profile= {loser.profile} />
                    </Card>
                </div>

                <Link 
                    to= '/battle'
                    className='btn dark-btn btn-space'>
                        Reset
                </Link>
            </React.Fragment>
        )
    }
}
