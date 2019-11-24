import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables';
import '../css/ProductPage.css';
import upvote from '../icons/upvote.png';
import downvote from '../icons/downvote.png';
import upvoteActive from '../icons/upvote-active.png';
import downvoteActive from '../icons/downvote-active.png';
import '../css/PostPage.css';
import Error from '../Error/Error';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class PostPage extends React.Component {

    state = {
        post: null,
        comments: null,
        comment: null,
        votedPost: null
    }

    componentDidMount() {
        const postId = window.location.href.split("/posts/")[1];
        this.getPost(postId);
        this.getComments(postId);
        this.getVotedPost(postId);
    }

    getPost = postId => {
        axios.get(GlobalVariables.backendUrl + "/posts/" + postId, {}).then(data => this.setState({ ...this.state, post: data.data }));
    }


    getVotedPost = (postId) => {
        if (localStorage.getItem("token") !== null) {
            axios.get(GlobalVariables.backendUrl + "/posts/voted/" + postId, { headers: headers }, {})
                .then(data => this.setState({ ...this.state, votedPost: data.data }));
        }
    }

    checkIfUpvoted() {
        if (this.state.votedPost !== null) {
            return this.state.votedPost.up;
        }
    }

    checkIfDownvoted() {
        if (this.state.votedPost !== null) {
            return this.state.votedPost.down;
        }
    }

    getComments = postId => {
        axios.get(GlobalVariables.backendUrl + "/comments/" + postId, {}).then(data => this.setState({ ...this.state, comments: data.data }))
    }

    votePost = (postId, action) => {
        axios.put(GlobalVariables.backendUrl + "/posts/vote", {
            uid: postId,
            vote: action
        }, { headers: headers }).then(data => this.setState({
            post: data.data,
            votedPost: data.data.voteOnPost
        }), error => {
            if (error.response.status === 403) {
                window.location.href = "/login"

            }
        });
    }

    setComment = comment => {
        const chunks = comment.match(/.{1,25}/g);
        if (chunks != null) {
            comment = chunks.join(" ");
            this.setState({ ...this.state, comment: comment })
        }
    }

    addComment = () => {
        axios.post(GlobalVariables.backendUrl + "/comments", {
            postUid: this.state.post.uid,
            text: this.state.comment
        }, { headers: headers }).then(() => {
            this.setState({ ...this.state, comment: null });
            document.getElementById("comment").value = null
            this.getPost(this.state.post.uid);
            this.getComments(this.state.post.uid);
        },
            error => {
                this.setState({ ...this.state, error: null })
                if (error.response.data.errors != null) {
                    this.setState({ ...this.state, error: "There was an error: " + error.response.data.errors[0].defaultMessage })
                }
                else {
                    if (error.response.data.message != null) {
                        this.setState({ ...this.state, error: "There was an error: " + error.response.data.message })
                        if (error.response.status === 403) {
                            window.location.href = "/login"

                        }
                    }
                    else {
                        this.setState({ ...this.state, error: "Oops there was a problem." })
                    }
                }
            });
    }

    render() {

        if (this.state.post) {
            return (
                <div>
                    {this.state.error && <Error message={this.state.error} />}
                    <div className="single-post">
                        <h1>{this.state.post != null ? this.state.post.title : ""}</h1>
                        <p>{this.state.post.userUsername != null ? "by " + this.state.post.userUsername : ""}</p>
                        <img className="image" alt={this.state.post.title} src={GlobalVariables.backendUrl + '/posts/image/' + this.state.post.uid} width="350" />
                        <div className="info">
                            <p className="points">{this.state.post.points} points . </p>
                            <p className="points">{this.state.post.comments} comments</p>
                        </div>
                        <div className="post-buttons">
                            <img className="vote-button" alt="" src={this.checkIfUpvoted() ? upvoteActive : upvote} onClick={this.votePost.bind(this, this.state.post.uid, "up")} />
                            <img className="vote-button" alt="" src={this.checkIfDownvoted() ? downvoteActive : downvote} onClick={this.votePost.bind(this, this.state.post.uid, "down")} />
                        </div>
                    </div>
                    <div>
                        <form onSubmit={event => event.preventDefault()} className="comment-form">
                            <textarea rows="3" cols="50" className="comment" id="comment" placeholder="Add comment" onBlur={event => this.setComment(event.target.value)} />
                            <button className="comment-button" onClick={this.addComment.bind(this)}>Post</button>
                        </form>
                        <div className="comments">
                            {this.state.comments && this.state.comments.map((comment, i) =>
                                <div key={i}>
                                    <p className="comment-owner">by {comment.userUsername}</p>
                                    <p className="comment-text">{comment.text}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }

    }

}

export default PostPage;