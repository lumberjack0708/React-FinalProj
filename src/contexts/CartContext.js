import React, { createContext, useReducer, useContext } from 'react';

// 定義購物車狀態的初始值
// items 是一個空陣列，用於存放購物車中的商品
const initialState = {
  items: []
};

// 創建購物車的 Context
// CartContext 將用於在組件樹中傳遞購物車狀態和操作方法
const CartContext = createContext();

// 定義購物車的 Reducer 函數
// Reducer 根據不同的 action type 來更新購物車狀態
function cartReducer(state, action) {
  switch (action.type) {
    // 添加商品到購物車的 action
    case 'ADD_TO_CART':
      // 檢查商品是否已存在於購物車中
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingIndex >= 0) {
        // 如果商品已存在，則增加其數量
        const updatedItems = [...state.items]; // 複製現有的商品列表
        updatedItems[existingIndex].quantity += 1; // 增加數量
        return { ...state, items: updatedItems }; // 返回新的狀態
      } else {
        // 如果商品不存在，則將其添加到購物車，並設置數量為 1
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      }
    
    // 更新購物車中商品數量的 action
    case 'UPDATE_QUANTITY':
      const { id, quantity } = action.payload; // 從 action payload 中獲取商品 ID 和新的數量
      return {
        ...state,
        items: state.items.map(item => 
          // 如果商品 ID 匹配且數量大於 0，則更新數量
          item.id === id && quantity > 0 ? { ...item, quantity } : item
        )
      };
    
    // 從購物車中移除商品的 action
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        // 過濾掉具有指定 ID 的商品
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    // 清空購物車的 action
    case 'CLEAR_CART':
      return { ...state, items: [] }; // 將商品列表設置为空陣列
    
    // 默認情況下，返回當前狀態
    default:
      return state;
  }
}

// 定義 CartProvider 組件
// CartProvider 使用 useReducer Hook 來管理購物車狀態，並通過 Context 提供給子組件
export function CartProvider({ children }) {
  // 使用 useReducer 初始化狀態和 dispatch 函數
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // 計算購物車中所有商品的总價格
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // 定義將通過 Context 提供的 value
  // 包含購物車商品、總價格以及操作購物車的函數
  const value = {
    items: state.items, // 當前購物車中的商品
    totalPrice, // 購物車中商品的總價格
    // 添加商品到購物車的函數
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    // 更新商品數量的函數
    updateQuantity: (id, quantity) => {
      if (quantity < 1) return; // 確保數量不會小於 1
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    },
    // 從購物車移除商品的函數
    removeFromCart: (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    // 清空購物車的函數
    clearCart: () => dispatch({ type: 'CLEAR_CART' })
  };
  
  // 使用 CartContext.Provider 將 value 提供給子組件
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 定義自定義 Hook useCart
// useCart 簡化了在組件中使用 CartContext 的過程
export function useCart() {
  const context = useContext(CartContext); // 使用 useContext Hook 獲取 CartContext 的值
  if (!context) {
    // 如果 context 未定義，表示 useCart 沒有在 CartProvider 內部使用
    throw new Error('useCart must be used within a CartProvider');
  }
  return context; // 返回 context，使組件可以訪問購物車狀態和操作
}
