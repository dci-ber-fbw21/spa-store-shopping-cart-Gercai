import products from "../data/products";

const normalizedProducts = products.reduce((acc,productsEntry) => {
    
    acc[productsEntry.id] = productsEntry;  
    return acc;
        
},{});


// Products contain Product_id and quantity
const cart = {
    "products": {},
    "sum": 0,
}

const initialState= {
    normalizedProducts,
    cart
}

function appReducer(state = initialState, action){
    switch (action.type) {
        case "ADD_TO_CART":

                !state.cart.products[action.payload.productId]?
                state.cart.products[action.payload.productId] = 1:
                state.cart.products[action.payload.productId]++;
            
                console.log(action.payload.productId);


            return state;
        default:
            return state;
    }
}

export default appReducer;