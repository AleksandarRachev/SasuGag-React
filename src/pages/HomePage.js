import React from 'react';
import axios from 'axios';
import {
    Link,
} from "react-router-dom";

class HomePage extends React.Component {

    state = {
        products: [],
        asd: true
    }

    componentDidMount() {
        this.getProducts("http://10.22.41.101:9090/products?page=1")
    }

    getProducts = url => {
        axios.get(url, {}).then(data => this.setState({ ...this.state, products: data.data }));
    }
    

    renderThing = () => {
        if(this.state.asd === true){
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
                        <div key={i}>
                            <h2>{product.name}</h2>
                            <img src={'http://10.22.41.101:9090/products/'+product.uid} width="350"/>
                        </div>
                    )}
                </div>
            );
        }
    };

    changeRender = () => {
        this.setState({...this.state, asd:!this.state.asd})
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