import React, {Component} from "react";
import {connect} from "react-redux";
import "./index.scss";

class ProductList extends Component {
    
    state = {
        comment: ""
    }
    
    componentDidUpdate(){
       
    }

    render(){
        return(
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
                        <p>In Stock: {product.inventory}</p>
                        <button onClick={() => {
                             this.props.addToCart(key);
                        }}> Add To Cart</button>
                        </section>
                        </div>
                    )
                })
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

const mapActionsToProps = (dispatch) => {
    return{
        addToCart: (productId) => {
             dispatch({
                type: "ADD_TO_CART",
                payload: {
                    productId
                }
             });
        }
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ProductList);
