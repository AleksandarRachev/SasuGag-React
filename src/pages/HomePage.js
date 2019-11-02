import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables'
import {
    Link,
} from "react-router-dom";

class HomePage extends React.Component {

    state = {
        products: [],
        onHomePage: true,
        page:"1",
        pages : []
    }

    componentDidMount() {
        axios.get(GlobalVariables.backendUrl+"/products/count", {}).then(data => this.setState({ ...this.state, pages: new Array(data.data) }));
        this.getProducts(GlobalVariables.backendUrl+"/products?page="+this.state.page)
    }

    componentDidUpdate() {
        for(let i =0;i < this.state.pages.length/5;i++){
            this.state.pages[i]=i;
        }
    }

    getProducts = url => {
        axios.get(url, {}).then(data => this.setState({ ...this.state, products: data.data }));
    }

    changePage = page => {
        this.setState({...this.state, page:page})
        this.getProducts(GlobalVariables.backendUrl+"/products?page="+page)
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    renderThing = () => {
        if(this.state.onHomePage === true){
            return (
                <div>
                    <h1>Welcome to koza world.</h1>
                    <p>Here you have a wild variery to pick you dream koza</p>
                    <button onClick={this.changeRender.bind()}>Click to shop</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Link to="/products">Add Koza</Link>
                    <h1>Products page</h1>
                        {this.state.products && this.state.products.map((product, i) =>
                            <div className="product" key={i}>
                                <h2>{product.name}</h2>
                                <img className="image" src={GlobalVariables.backendUrl+'/products/'+product.uid} width="350"/>
                            </div>
                        )}
                        <table>
                            <thead>
                                <tr>
                                    {this.state.pages && this.state.pages.map((product, i) =>
                                        <th key={i}><button onClick={this.changePage.bind(this, i+1)}>{i+1}</button></th>
                                    )}
                                </tr>
                            </thead>
                    </table>
                </div>
            );
        }
    };

    changeRender = () => {
        this.setState({...this.state, onHomePage:!this.state.onHomePage})
    }

    render() {
        return (
            <div>
                <div>
                    {this.renderThing()}
                </div>
            </div>
        )
    };
}

export default HomePage;