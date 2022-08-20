import { Button } from '@material-ui/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/init-firebase';
import './user.css';
import useStyles from './userStyles';

const User = ({ userData }) => {
    const redirect = useNavigate();
    const classes = useStyles();
    return (
        <>
            
            {auth?.currentUser &&
                <div className="card-container">
                    <header className='header' style={{ backgroundImage: `url("${userData.cover}")`, backgroundSize: "cover" }}>
                        <img className='img' src={userData?.userImg} alt={userData?.name} />
                    </header>
                    <h1 className="bold-text">
                        {userData?.name}
                    </h1>
                    <h2 className="normal-text">{userData?.email}</h2>
                    <div className="social-container">
                        <div className="followers">
                            <h1 className="bold-text">{userData?.completedOrders.length}</h1>
                            <h2 className="smaller-text">Completed Orders</h2>
                        </div>
                        {/* <div className="followers">
                    <Button className={classes.sendButton}>List of Completed Orders</Button>
                </div>
                <div className="likes" style={{marginTop:'20px'}}>
                <Button className={classes.sendButton}>Edit Profile</Button>
                </div> */}


                    </div>
                </div >
            }
            {!auth?.currentUser && redirect('/login')}
        </>
    )
}

export default User