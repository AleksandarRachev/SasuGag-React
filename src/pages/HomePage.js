import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables'
import '../css/HomePage.css'
import {
    Link,
} from "react-router-dom";

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class HomePage extends React.Component {

    state = {
        products: [],
        onHomePage: true,
        page: "1",
        pages: [],
        categories: [],
        currentCategory: null
    }

    componentDidMount() {
        axios.get(GlobalVariables.backendUrl + "/categories", {
            headers: headers
        }).then(data => this.setState({ ...this.state, categories: data.data }));
        this.getProducts(1)
    }

    componentDidUpdate() {
        for (let i = 0; i < this.state.pages.length / 5; i++) {
            this.state.pages[i] = i;
        }
    }

    getProducts = (page) => {
        axios.get(GlobalVariables.backendUrl + "/products/count", {}).then(data => this.setState({ ...this.state, pages: new Array(data.data) }));
        this.setState({ ...this.state, currentCategory: null })
        axios.get(GlobalVariables.backendUrl + "/products?page=" + page, {
            headers: headers
        }).then(data => this.setState({ ...this.state, products: data.data }));
    }

    getProductsFiltered = category => {
        axios.get(GlobalVariables.backendUrl + "/products/count/filter?category=" + category, {
            headers: headers
        }).then(data => this.setState({ ...this.state, pages: new Array(data.data) }));
        this.setState({ ...this.state, currentCategory: category })
        axios.get(GlobalVariables.backendUrl + "/products/filter?category=" + category, {
            headers: headers
        }).then(data => this.setState({ ...this.state, products: data.data }))
    }

    changePage = page => {
        this.setState({ ...this.state, page: page })
        if (this.state.currentCategory == null) {
            this.getProducts(page)
        }
        else {
            axios.get(GlobalVariables.backendUrl + "/products/filter?category=" + this.state.currentCategory + "&page=" + page,
                {
                    headers: headers
                }).then(data => this.setState({ ...this.state, products: data.data }))
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    checkIfUserLogged = () => {
        if (localStorage.getItem("token") == null) {
            window.location.href = "/login"
        }
    }

    renderThing = () => {
        if (this.state.onHomePage === true) {
            return (
                <div>
                    <h1 className='title-home'>Welcome to koza world.</h1>
                    <p>Here you have a wild variery to pick you dream koza</p>
                    <button onClick={this.changeRender.bind()}>Click to shop</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="sidenav">
                        <Link className="asd" to="/products" onClick={this.checkIfUserLogged.bind(this)}>Add Koza</Link>
                        <a hreg="#" onClick={this.getProducts.bind(this, 1)}>All</a>
                        {this.state.categories && this.state.categories.map((category, i) =>
                            <a key={i} href="#" onClick={this.getProductsFiltered.bind(this, category.name)}>{category.name}</a>)}
                    </div>
                    <div className="App-header">
                        <h1 className="title-home">Products page</h1>
                        {this.state.products && this.state.products.map((product, i) =>
                            <div className="product" key={i}>
                                <h2>{product.name}</h2>
                                <p>{product.userUsername != null ? "by " + product.userUsername : ""}</p>
                                <img className="image" alt={product.name} src={GlobalVariables.backendUrl + '/products/image/' + product.uid} width="350" />
                            </div>
                        )}
                        {<div className="pages">
                            {this.state.pages && this.state.pages.map((product, i) =>
                                <div className="page-button" key={i}><button onClick={this.changePage.bind(this, i + 1)}>{i + 1}</button></div>
                            )}
                        </div>}
                    </div>
                </div>
            );
        }
    };

    changeRender = () => {
        this.setState({ ...this.state, onHomePage: !this.state.onHomePage })
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