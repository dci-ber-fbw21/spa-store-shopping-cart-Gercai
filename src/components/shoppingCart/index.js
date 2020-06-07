import React, {Component} from "react";
import {connect} from "react-redux";

import "./index.scss";

class ShoppingCart extends Component {

    render(){
        return(
            <div className="CheckoutCart">

                    {
                 Object.keys(this.props.cart.products).length > 0?
                 <div>{
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
                            
                      
                            </article>)
                    })}
                     <section className="Kasse">
                            <p>Total</p>
                            <p>{this.props.costs}</p>
                            <button
                            onClick= {
                                () => {
                                    this.props.buyFromCart(); this.props.toggleCheckOff();                   
                                }
                            }
                        >Buy</button>
                        </section>
                    </div>:
                        <article>
                            <img src={require("../../images/icons/hanger.svg")} alt="hanger"></img> 
                        </article>}
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

const mapStateToProps = (state,ownProps) => {
  return {
        productList: state.cartReducer.normalizedProducts,
        cart: state.cartReducer.cart,
        productCount: state.cartReducer.cart.sum,
        costs: state.cartReducer.cart.price,
        check: state.cartFilter.cartToggler.check
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ShoppingCart);
 
// export default ShopHeader;