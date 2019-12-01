import React from 'react';
import {
    Link,
} from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

class Profile extends React.Component {

    render() {
        if (localStorage.getItem("user") === null) {
            window.location.href = "/login"
        }
        else {
            return (
                <div>
                    <div className="sidenav">
                        <Link to="/user-posts">Your posts</Link>
                        <Link to="/user-voted">Voted posts</Link>
                    </div>
                    <div>
                        <h1 className="title-home">Hello {user.username === null ? user.email : user.username}</h1>
                    </div>
                </div>
            );
        }
    }
}

export default Profile;