import React, {Component} from "react";
import {connect} from "react-redux";
import ProductList from "../productList";
import ShoppingCart from "../shoppingCart";
import shopCart from "../../images/icons/bag.svg"

import "./index.scss";

class ShopHeader extends Component {
    
    state = {
        comment: "",
        showCart: false,
        checkout: false
    } 

    componentDidUpdate(){
        let check = this.props.productCount&&!this.state.showCart;
        if(check)
        {
            this.setState({
                showCart: true
            })
        }
    }
    
    render(){
        return(
            <div className="shopBody">
                <article className="shopHeader">
                    <h1>Shop</h1>
                </article>   
           {this.state.showCart && 
           <article className="shoppingCart">
                <p> <img src={shopCart} alt=""/>
                <span>  {this.props.productCount} </span></p>
                <p>
                <button onClick={(element) => {
                    this.setState({
                            checkout: true,
                            showCart: false
                        })
                }}> Check </button>
                </p>
            </article> }
            {!this.state.checkout &&   <ProductList></ProductList>}
            {this.state.checkout && 
            <article>
                <section className="cardHead">
                <button onClick={
                    () => {
                        this.setState({
                            checkout: false
                        })
                    }
                }>X</button>
                </section>
             <ShoppingCart></ShoppingCart> 
             </article>
           }
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
  return {
        productList: state.normalizedProducts,
        productCount: state.cart.sum
    }
}

export default connect(
    mapStateToProps,
)(ShopHeader);
 
// export default ShopHeader;