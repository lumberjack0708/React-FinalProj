import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { updateQuantity, removeFromCart, clearCart } from '../redux/cartSlice';
import { Container, Card, Heading, Button } from '../styles/styles';

// 模擬 API 請求 - 此函數在 Redux 版本中不再使用，但保留用於教學目的
const fetchCartItems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '貓咪飼料', price: 1200, quantity: 2 },
        { id: 2, name: '寵物玩具球', price: 350, quantity: 1 },
        { id: 3, name: '貓砂', price: 500, quantity: 3 }
      ]);
    }, 1000);
  });
};

function CartPage() {
  // 使用主題
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 從 Redux store 獲取購物車數據
  const cartItems = useSelector(state => state.cart.items);
  
  // 載入狀態 - 在真實應用中，若是從API獲取數據會用到
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    // 使用 useEffect 模擬 API 請求 - 使用 Redux 後不再需要
  /*
  useEffect(() => {
    setLoading(true);
    fetchCartItems()
      .then(data => {
        setCartItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError('無法載入購物車資訊');
        setLoading(false);
        console.error(err);
      });
  }, []);
  */
  
  // 計算購物車總金額
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // 更新商品數量
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  
  // 移除商品
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  
  return (
    <Container>
      <Heading theme={theme}>購物車</Heading>
      
      {loading ? (
        <p>載入中...</p>
      ) : error ? (
        <p>{error}</p>      ) : cartItems.length === 0 ? (
        <Card theme={theme}>
          <p>購物車是空的</p>
          <Button theme={theme} primary onClick={() => navigate('/products')}>繼續購物</Button>
        </Card>
      ) : (
        <>
          {cartItems.map(item => (
            <Card key={item.id} theme={theme} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>{item.name}</h3>
                <p>單價: ${item.price}</p>
              </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                  theme={theme} 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  style={{ margin: '0 8px' }}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button 
                  theme={theme} 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  style={{ margin: '0 8px' }}
                >
                  +
                </Button>
                <Button 
                  theme={theme} 
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ marginLeft: '16px' }}
                >
                  移除
                </Button>
              </div>
            </Card>
          ))}
            <Card theme={theme}>
            <h3>訂單摘要</h3>
            <p>總金額: ${totalPrice}</p>            <Button 
              theme={theme} 
              primary
              onClick={() => {
                const orderInfo = cartItems.map(item => `${item.name} x ${item.quantity} = $${item.price * item.quantity}`).join('\n');
                const message = `訂單已成立！\n\n商品明細：\n${orderInfo}\n\n總金額：$${totalPrice}\n\n感謝您的購買！`;
                alert(message);
                // 在實際應用中，此處會發送訂單到後端API
                dispatch(clearCart());
              }}
            >
              結帳
            </Button>
          </Card>
        </>
      )}
    </Container>
  );
}

export default CartPage;
