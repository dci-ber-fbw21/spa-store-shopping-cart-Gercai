import React, {Component} from "react";
import {connect} from "react-redux";
import "./index.scss";

class ProductList extends Component {
    

    renderInventoryBanner(inventory){
        if(inventory === 0 ){
            return "soldOut"
        }
        else if( inventory <= 10){
            return "lowStock"
        }
    }

    render(){
        return(
            <article className="gridCentering">
            <div className="productGrid">
               {
                Object.keys(this.props.productList).map((key)=> {
                    let product = this.props.productList[key]
                    return(
                        <div className="product">
                            <section>
                            <img src={require("../../images/" +  this.props.productList[key].imageUrl)} alt=""/> 
                            </section>                  
                        <section>
                         <p>{product.title}</p>
                         <p>{product.price}€</p>

                        <div className={this.renderInventoryBanner(product.inventory)}></div>
                        
                        <button     
                            onClick={() => { 
                                                this.props.toggleCartOn(); 
                                                this.props.addToCart(key);
                                            }}
                            disabled = {product.inventory===0?true:false}    
                        >Put in Cart </button>

                        </section>
                        </div>
                    )
                })
               }
            </div>
            </article>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        cartOn: state.cartFilter.cartToggler.toggle,
        productList: state.cartReducer.normalizedProducts,
        productCount: state.cartReducer.cart.sum,
       
    }
}

const mapActionsToProps = (dispatch) => {
    return{
        addToCart: (productId) => {
             dispatch({
                type: "ADD_TO_CART",
                payload: {
                    productId
                }
             });
        },
        toggleCartOn: () => {
            dispatch({
                type: "TOGGLE_ON",
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ProductList);
