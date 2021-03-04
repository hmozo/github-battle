import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers,FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
//import { RuntimeGlobals } from 'webpack'
import Card from './Card'
import PropTypes from 'prop-types'


function ProfileList({ profile }){
    return(
        <ul className='card-list'>
            {profile.location && (
                <li>
                    <FaCompass color='rgb(144, 115, 255)' size={22} />
                    {profile.location}
                </li>
            )}
            {profile.company && (
                <li>
                    <FaBriefcase color='#795548' size={22} />
                    {profile.company}
                </li>
            )}
            <li>
                <FaUsers color='rgb(239, 115, 155)' size={22} />
                {profile.name}
            </li>
            <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                {profile.followers.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes= {
    profile: PropTypes.object.isRequired
}

export default class Results extends React.Component{
    constructor(props){
        super(props)

        this.state= {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount(){
        const { playerOne, playerTwo }= this.props

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
            return <p>Loading...</p>
        }

        if(error){
            return(
                <p className='center-text error'>{error}</p>
            )
        }

        return(
            <div className='grid space-around container-sm'>
                <div className='card bg-light'>
                    <Card 
                        header= {winner.score===loser.score?'Tie':'Winner'}
                        subheader= {`Score: ${winner.score.toLocaleString()}`}
                        avatar= {winner.profile.avatar_url}
                        href= {winner.profile.html_url}
                        name= {winner.profile.login}
                    >
                        <ProfileList profile= {winner.profile} />
                    </Card>
                </div>

                <div className='card bg-light'>
                    <h4 className='header-lg center-text'>
                        {winner.score===loser.score?'Tie':'Loser'}
                    </h4>
                    <img 
                        className='avatar'
                        src={loser.profile.avatar_url}
                        alt={`Avatar for ${loser.profile.login}`}
                    />
                    <h4 className='center-text'>
                        Score: {loser.score.toLocaleString()}
                    </h4>
                    <h2 className='center-text'>
                        <a className='link' href={loser.profile.html_url} >
                            {loser.profile.login}
                        </a>
                    </h2>
                                   
                    <ul className='card-list'>
                       
                        {loser.profile.location && (
                        <li>
                            <FaCompass color='rgb(144, 115, 255)' size={22} />
                            {loser.profile.location}
                        </li>
                        )}
                        {loser.profile.company && (
                        <li>
                            <FaBriefcase color='#795548' size={22} />
                            {loser.profile.company}
                        </li>
                        )}
                        <li>
                            <FaUsers color='rgb(239, 115, 155)' size={22} />
                            {loser.profile.name}
                        </li>
                        <li>
                            <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                            {loser.profile.followers.toLocaleString()} following
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}