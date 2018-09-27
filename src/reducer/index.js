const initialState = {
    pizza: 0,
    beverage: 0,
    sides: 0
};
const appreducer = function(state = initialState, action) {
    //console.log('reducer function called');
    if(action.item === 'Pizza'){
        if(action.type === 'INCREMENT'){
            return Object.assign({}, state, {
                pizza: state.pizza+1,
                beverage: state.beverage,
                sides: state.sides
            })
        }else{
            if(state.pizza === 0){
                return state;
            }else{
                return{
                    pizza: state.pizza-1,
                    beverage: state.beverage,
                    sides: state.sides
                }
            }
        }
    }
    else if(action.item === 'Beverages'){
        if(action.type === 'INCREMENT'){
            return{
                pizza: state.pizza,
                beverage: state.beverage+1,
                sides: state.sides
            }
        }else{
            if(state.beverage === 0){
                return state;
            }else{
                return{
                    pizza: state.pizza,
                    beverage: state.beverage-1,
                    sides: state.sides
                }
            }
        }
    }else if(action.item === 'Sides'){
        if(action.type === 'INCREMENT'){
            return{
                pizza: state.pizza,
                beverage: state.beverage,
                sides: state.sides+1
            }
        }else{
            if(state.sides === 0){
                return state;
            }else{
                return{
                    pizza: state.pizza,
                    beverage: state.beverage,
                    sides: state.sides-1
                }
            }
        }
    }else{
        return state;
    }
}

export default appreducer;