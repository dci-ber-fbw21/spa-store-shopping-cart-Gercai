import products from "../data/products";

const normalizedProducts = products.reduce((acc,productsEntry) => {
    
    acc[productsEntry.id] = productsEntry;  
    return acc;
        
},{});


// Products contain Product_id and quantity
const cart = {
    "products": [],
    "sum": 0,
}

const initialState= {
    normalizedProducts,
    cart
}

function appReducer(state = initialState, action){
    switch (action) {
        case "ADD_TOCART":
            return state;
        default:
            return state;
    }
}

export default appReducer;