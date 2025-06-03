import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {
                id: action._id, img: action.img, name: action.name,
                // menuItems: action.menuItems,
                qty: action.qty,
                price: action.price, size: action.size, finalPrice: action.finalPrice
            }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "DROP":
            let empArray = []
            return empArray

        case "UPDATE":
            let updatedArr = [...state];
            const foodIndex = updatedArr.findIndex(food => food.id === action._id && food.size === action.size);
            if (foodIndex !== -1) {
                updatedArr[foodIndex] = {
                    ...updatedArr[foodIndex],
                    qty: action.qty,  // Update quantity
                    price: action.price,  // Update price
                };
            }
            return updatedArr;


        default:
            console.log("Error in reducer");
            return state;
    }
}

export const CartProvide = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}


export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);