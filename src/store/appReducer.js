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
    let newState = state;
    let cartProducts = newState.cart.products;
    let cartCount = 0;
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
                    cartProducts[productId] = {productId, count: 1}:
                    cartProducts[productId].count++;
                newState.cart.sum++;  
                for (let product in cartProducts){
                    cartCount += cartProducts[product].count;
                }
            newState.cart.sum = cartCount;
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
            cartProducts[productId].count >1?
                cartProducts[productId].count--:
                delete cartProducts[productId];

                for (let product in cartProducts){
                    cartCount += cartProducts[product].count;
                }
                newState.cart.sum = cartCount;

                return {...state,
                    ...newState}
    }   
        default:
            return state;
    }
}

export default appReducer;