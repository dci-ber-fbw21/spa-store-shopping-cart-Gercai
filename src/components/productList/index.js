import React, {Component} from "react";
import {connect} from "react-redux";
import "./index.scss";

class ProductList extends Component {
    
    state = {
        comment: ""
    }
    
    render(){
        return(
            <div className="productGrid">
               {
                Object.keys(this.props.productList).map((key)=> {
                    return(
                        <div className="product">
                            <section>
                            <img src={require("../../images/" +  this.props.productList[key].imageUrl)} alt=""/> 
                            </section>                  
                        <section>
                         <p>   {this.props.productList[key].title}</p>
                         <p>   {this.props.productList[key].price}€</p>
                        <button onClick={() => {
                             this.props.addToCart(this.props.productList[key].id,{
                                ProductId: 4343,
                            });
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
        productList: state.normalizedProducts
    }
}

const mapActionsToProps = (dispatch) => {
    return{
        addToCart: (id) => {
             dispatch({
                type: "ADD_TO_CART",
                payload: {
                    postId: id,
                    price: "999999999999"
                }
             });
        }
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ProductList);
