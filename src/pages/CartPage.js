import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../components/Notification';
import { Container, Card, Heading, Button } from '../styles/styles';

function CartPage() {
  // 使用主題
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // 使用自訂的 Hooks
  const { items: cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { notify } = useNotification();
  
  // 載入狀態 - 在真實應用中，若是從API獲取數據會用到
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 更新商品數量
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };
  
  // 移除商品
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };
    // 處理結帳
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      notify.warning('購物車是空的', '請先添加商品到購物車');
      return;
    }
    // 顯示訂單明細
    const orderInfo = cartItems.map(item => `${item.name} x ${item.quantity} = $${item.price * item.quantity}`).join('\n');
    const message = `訂單已成立！\n\n商品明細：\n${orderInfo}\n\n總金額：$${totalPrice}\n\n感謝您的購買！`;
    alert(message);
    clearCart();
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
          ))}            <Card theme={theme}>
            <h3>訂單摘要</h3>
            <p>總金額: ${totalPrice}</p>
            <Button 
              theme={theme} 
              primary
              onClick={handleCheckout}
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
