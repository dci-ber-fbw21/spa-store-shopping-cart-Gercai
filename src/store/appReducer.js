import products from "../data/products";
// import _ from "lodash";
import produce from "immer";

const normalizedProducts = products.reduce((acc,productsEntry) => {
    acc[productsEntry.id] = productsEntry;  
    return acc;
},{});

// Products contain Product_id and quantity
const cart = {
    "products": {},
    "sum": 0,
    "price" : 0,
}
const initialState= {
    normalizedProducts,
    cart
}

const appReducer = produce((draft = initialState, action) => {
    let cartProducts = draft.cart.products;
    let cartCount = 0;
    let cartSum = 0;
    switch (action.type) {
        case "ADD_TO_CART":
        {
              let productId = action.payload.productId;
        // Calculating for Products
                if(draft.normalizedProducts[productId].inventory >0 ){
                    draft.normalizedProducts[productId].inventory--;
                } 
        // Calculating for Cart 
                !cartProducts[productId]?
                    cartProducts[productId] = 
                    {productId, count: 1}:
                    cartProducts[productId].count++;
                draft.cart.sum++;  
                for (let product in cartProducts){
                    cartCount += cartProducts[product].count;
                    cartSum +=  cartProducts[product].count * draft.normalizedProducts[productId].price;
                }     
                
            draft.cart.sum = cartCount;
            draft.cart.price = cartSum.toFixed(2);
        // Updating the State 
        return
        }
        case "REMOVE_FROM_CART":
            {
        // Calculating fro Products
            let productId = action.payload.productId;
                if(cartProducts[productId].count >0 ){
                draft.normalizedProducts[productId].inventory++;
            }
                
        // Calculating for Cart 
            cartProducts[productId].count >1?
                cartProducts[productId].count--:
                delete cartProducts[productId];

                for (let product in cartProducts){
                    cartCount += cartProducts[product].count;
                    cartSum   += cartProducts[product].count * draft.normalizedProducts[productId].price;
                }
                draft.cart.sum = cartCount;
                draft.cart.price = cartSum.toFixed(2);
                return 
    }   
        case "BUY_FROM_CART":
            draft.cart = initialState.cart;
            return
        default:
            return draft
    }
});

export default appReducer;