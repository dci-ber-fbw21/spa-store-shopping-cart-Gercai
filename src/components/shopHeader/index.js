import React, {Component} from "react";
import {connect} from "react-redux";
import ProductList from "../productList";

import "./index.scss";

class ShopHeader extends Component {
    
    state = {
        comment: ""
    }



    componentDidUpdate(){

        console.log(this.props.productCount);
    }
    
    render(){
   
   
        console.log(this.props.productCount);
        return(
            <div>
                <article className="shopHeader">
                    <h1>Shop</h1>
                    <p> ProductCount: </p>
                </article>   
            <ProductList></ProductList>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    
    return {
        productList: state.normalizedProducts,
        productCount: state.cart
    }
}

// const mapActionsToProps = (dispatch) => {
//     return{
//         addToCart: (productId) => {
//              dispatch({
//                 type: "ADD_TO_CART",
//                 payload: {
//                     productId,
//                     price: "999999999999"
//                 }
//              });
//         }
//     }
// }

export default connect(
    mapStateToProps,
    // mapActionsToProps
)(ShopHeader);
 
// export default ShopHeader;