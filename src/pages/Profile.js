import React from 'react';

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
                        <a>Your posts</a>
                        <a>Voted posts</a>
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