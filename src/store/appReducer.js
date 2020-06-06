import products from "../data/products";
import _ from "lodash";

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
function appReducer(state = initialState, action){
    let newState = _.cloneDeep(state)
    let cartProducts = newState.cart.products;
    let cartCount = 0;
    let cartSum = 0;
    switch (action.type) {
        case "ADD_TO_CART":
        {
              let productId = action.payload.productId;
        // Calculating for Products
                if(newState.normalizedProducts[productId].inventory >0 ){
                    newState.normalizedProducts[productId].inventory--;
                } 
        // Calculating for Cart 
                !cartProducts[productId]?
                    cartProducts[productId] = 
                    {productId, count: 1}:
                    cartProducts[productId].count++;
                newState.cart.sum++;  
                for (let product in cartProducts){
                    cartCount += cartProducts[product].count;
                    cartSum +=  cartProducts[product].count * state.normalizedProducts[productId].price;
                }     
            newState.cart.sum = cartCount;
            newState.cart.price = cartSum.toFixed(2);
        // Updating the State 
                return {...state,
                        ...newState}
        }
        case "REMOVE_FROM_CART":
            {
        // Calculating fro Products
            let productId = action.payload.productId;
                if(cartProducts[productId].count >0 ){
                newState.normalizedProducts[productId].inventory++;
            }
                
        // Calculating for Cart 
            cartProducts[productId].count >1?
                cartProducts[productId].count--:
                delete cartProducts[productId];

                for (let product in cartProducts){
                    cartCount += cartProducts[product].count;
                    cartSum   += cartProducts[product].count * state.normalizedProducts[productId].price;
                }

                newState.cart.sum = cartCount;
                newState.cart.price = cartSum.toFixed(2);
                return {...state,


    
                        ...newState}
    }   
        case "BUY_FROM_CART":
            
            newState.cart = {
                "products": {},
                "sum": 0,
                "price" : 0,
            }
            return {...state,
                ...newState}
        default:
            return state;
    }
}

export default appReducer;