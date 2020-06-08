import React, {Component} from "react";
import {connect} from "react-redux";
import ProductList from "../productList";
import ShoppingCart from "../shoppingCart";
import shopCart from "../../images/icons/bag.svg"

import "./index.scss";

class ShopHeader extends Component {
    
    render(){
        return(
            <div className="shopBody">
                <article className="shopHeader">
                    <h1>Shop</h1>
                </article>   
           {this.props.cartOn && 
           <article className="shoppingCart">
                <p> <img src={shopCart} alt=""/>
                <span>  {this.props.productCount} </span></p>
                <p>
                <button onClick={
                    () => {
                        this.props.toggleCheckOn();
                    }
                }> Check </button>
                </p>
            </article> }
            {!this.props.check?<ProductList></ProductList>: 
            <article>
                <section className="cardHead">
                <button className="backTo" onClick={
                    () => {
                        this.props.toggleCheckOff();
                        if(this.props.productCount>0){
                           this.props.toggleCartOn();
                        }
                    }
                }>Back To Products</button>
                </section>
             <ShoppingCart></ShoppingCart> 
             </article>
            }
            </div>
        )
    }
}

const mapActionsToProps = (dispatch) => {
    return{
        toggleCheckOn: () => {
            dispatch({
                type: "CHECK_ON",
            })
        },
        toggleCheckOff: () => {
            dispatch({
                type: "CHECK_OFF",
            })
        },
        toggleCartOn: () => {
            dispatch({
                type: "TOGGLE_ON",
            })
        }
    }
}

const mapStateToProps = (state) => {
  return {
        productList: state.cartReducer.normalizedProducts,
        productCount: state.cartReducer.cart.sum,
        cartOn: state.cartFilter.cartToggler.toggle,
        check: state.cartFilter.cartToggler.check
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ShopHeader);