// import _ from "lodash";
import produce from "immer";

// Products contain Product_id and quantity
const cartToggler = {
    toggle: true,
    check: false
}
const initialState= {
    cartToggler
}

const appFilter = produce((draft = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_ON":
                    draft.cartToggler.toggle = true;
            return
        case "TOGGLE_OFF":
                    draft.cartToggler.toggle = false;
            return
        case "CHECK_ON":
                    draft.cartToggler.check = true;
                    draft.cartToggler.toggle = false;
            return
        case "CHECK_OFF":
                    draft.cartToggler.check = false;
            return
        default:
            return draft
    }
});

export default appFilter;