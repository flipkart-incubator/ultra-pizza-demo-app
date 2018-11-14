const initialState = {
    pizza: 0,
    beverage: 0,
    sides: 0
};
const appreducer = function(state = initialState, action) {
    if(action.type === 'UPDATE_ORDERID'){
        return {
            ...state,
            orderId: action.orderId
        }
    }
    if(action.type === 'UPDATE_IDENTITY_TOKEN'){
        return {
            ...state,
            identityToken: action.identityToken
        }
    }
    if(action.item === 'Pizza'){
        if(action.type === 'INCREMENT'){
            return {
                ...state,
                pizza: state.pizza+1
            }
        }else{
            if(state.pizza === 0){
                return state;
            }else{
                return{
                    ...state,
                    pizza: state.pizza-1
                }
            }
        }
    }
    else if(action.item === 'Beverages'){
        if(action.type === 'INCREMENT'){
            return{
                ...state,
                beverage: state.beverage+1
            }
        }else{
            if(state.beverage === 0){
                return state;
            }else{
                return{
                    ...state,
                    beverage: state.beverage-1
                }
            }
        }
    }else if(action.item === 'Sides'){
        if(action.type === 'INCREMENT'){
            return{
                ...state,
                sides: state.sides+1
            }
        }else{
            if(state.sides === 0){
                return state;
            }else{
                return{
                    ...state,
                    sides: state.sides-1
                }
            }
        }
    }else{
        return state;
    }
}

export default appreducer;