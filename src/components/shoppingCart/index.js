import React, {Component} from "react";
import {connect} from "react-redux";

import "./index.scss";

class ShoppingCart extends Component {
    
    state = {
    }

    render(){

        console.log(this.props.cart);
        return(
            <div className="CheckoutCart">

                    {
                        Object.keys(this.props.cart.products).map((key) => {
                             return(
                                 <div>   
                             <article className="cartProduct"> 
                            <img src={require("../../images/" +  this.props.productList[key].imageUrl)} alt={this.props.productList[key].title}/>
                            <section> 
                              <p>   {this.props.productList[key].title}</p>
                              <p>   {this.props.productList[key].price}€</p>
                              <p> qty: {this.props.cart.products[key].count}</p>
                              </section>
                            </article> 
                            <button onClick={() => {
                        this.props.removeFromCart(key);
                            }}>Remove</button>
                            </div>)
                        })
                    }
            </div>
        )
    }
}



const mapActionsToProps = (dispatch) => {
    return{
        removeFromCart: (productId) => {
             dispatch({
                type: "REMOVE_FROM_CART",
                payload: {
                    productId
                }
             });
        }
    }
}


const mapStateToProps = (state,ownProps) => {
  return {
        productList: state.normalizedProducts,
        cart: state.cart,
        productCount: state.cart.sum
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ShoppingCart);
 
// export default ShopHeader;