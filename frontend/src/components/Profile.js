import React from 'react';
import { Link } from 'react-router-dom'


const Profile = (props) => {
    console.log(props)
    const userData = props.user ? 
    (
        <div>
            <h1>Profile</h1>
            <h4>Name: {props.user.name}</h4>
            <h4>Email: {props.user.email}</h4>
            <h4>ID: {props.user.id}</h4>
        </div> 
    ) : <h1>Loading ...</h1>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        )
    }

    return (
        <div>
            {props.user ? userData : errorDiv() }
        </div>
    )
}

export default Profile