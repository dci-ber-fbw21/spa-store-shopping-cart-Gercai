import React, {Component} from "react";
import {connect} from "react-redux";

import "./index.scss";

class ShoppingCart extends Component {

    render(){
        return(
            <div className="CheckoutCart">

                    {
                 Object.keys(this.props.cart.products).length > 0?
                 Object.keys(this.props.cart.products).map((key) => {
                             return(
                                 <article>   
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
                            
                            <section className="Kasse">
                        <p>Total</p>
                        <p>{this.props.costs}</p>
                        <button
                        onClick= {
                            () => {
                                this.props.buyFromCart();
                            }
                        }
                        >Buy</button>
                    </section>
                            </article>)
                    }):

                        <article>
                            <img src={require("../../images/icons/hanger.svg")} alt="hanger"></img> 
                        </article>
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
        },
        buyFromCart: () => {
            dispatch({
               type: "BUY_FROM_CART",
            });
        }
    }
}


const mapStateToProps = (state,ownProps) => {
  return {
        productList: state.normalizedProducts,
        cart: state.cart,
        productCount: state.cart.sum,
        costs: state.cart.price
        
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ShoppingCart);
 
// export default ShopHeader;