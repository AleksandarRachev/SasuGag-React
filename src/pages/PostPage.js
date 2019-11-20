import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables';
import '../css/ProductPage.css';
import upvote from '../icons/upvote.png';
import downvote from '../icons/downvote.png';
import '../css/PostPage.css';
import Error from '../Error/Error';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class PostPage extends React.Component {

    state = {
        post: null,
        comments: null,
        comment: null
    }

    componentDidMount() {
        const postId = window.location.href.split("/posts/")[1];
        this.getPost(postId);
        this.getComments(postId);
    }

    getPost = postId => {
        axios.get(GlobalVariables.backendUrl + "/posts/" + postId, {}).then(data => this.setState({ ...this.state, post: data.data }));
    }

    getComments = postId => {
        axios.get(GlobalVariables.backendUrl + "/comments/" + postId, {}).then(data => this.setState({ ...this.state, comments: data.data }))
    }

    votePost = (postId, action) => {
        axios.put(GlobalVariables.backendUrl + "/posts/vote", {
            uid: postId,
            vote: action
        }).then(data => this.setState({ ...this.state, post: data.data }));
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
                            <img className="vote-button" alt="" src={upvote} onClick={this.votePost.bind(this, this.state.post.uid, "up")} />
                            <img className="vote-button" alt="" src={downvote} onClick={this.votePost.bind(this, this.state.post.uid, "down")} />
                        </div>
                    </div>
                    <div>
                        <form onSubmit={event => event.preventDefault()} className="comment-form">
                            <textarea rows="3" cols="50" className="comment" id="comment" placeholder="Add comment" onBlur={event => this.setComment(event.target.value)} />
                            <button className="comment-button" onClick={this.addComment.bind(this)}>Post</button>
                        </form>
                        <div className="comments">
                            {this.state.comments && this.state.comments.map((comment, i) =>
                                <div>
                                    <p className="comment-owner">by {comment.userUsername}</p>
                                    <p className="comment-text" key={i}>{comment.text}</p>
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