import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { getProductImage } from '../assets/images/index';
import { useNotification } from '../components/Notification';
import { Container, Card, Heading, Button } from '../styles/styles';

// 模擬取得首頁產品推薦的函數
const fetchFeaturedProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '高級貓糧', price: 980, category: 'food', imageUrl: null },
        { id: 2, name: '寵物自動飲水機', price: 1250, category: 'accessories', imageUrl: null },
        { id: 3, name: '貓咪隧道玩具', price: 650, category: 'toy', imageUrl: null },
      ]);
    }, 1200);
  });
};

 /**
 * @function HomePage
 * @description 首頁元件，展示歡迎訊息、導覽按鈕與推薦商品。
 *              推薦商品模擬從伺服器取得，並可直接加入購物車。
 * @returns {JSX.Element} 返回首頁的 JSX 結構。
 */
function HomePage() {
  const navigate = useNavigate();       // 用於頁面導覽
  const dispatch = useDispatch();       // 使用 dispatch 發送 Redux actions
  const { notify } = useNotification(); // 取得通知顯示函數
  const [featuredProducts, setFeaturedProducts] = useState([]); // 推薦商品狀態
  const [loading, setLoading] = useState(true);                // 載入狀態

  // 只在首次渲染時模擬取得推薦商品
  useEffect(() => {
    setLoading(true);
    fetchFeaturedProducts()
      .then(products => {
        setFeaturedProducts(products);
        setLoading(false);
      })
      .catch(error => {
        console.error('獲取推薦產品時出錯：', error);
        setLoading(false);
      });
  }, []);
  
  // 處理添加商品到購物車
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    notify.success(
      '已加入購物車', 
      `${product.name} 已成功加入您的購物車！`
    );
  };
  
  return (
    <Container>
      <Heading>寵物百貨歡迎您</Heading>
      
      <Card>        
        <h2>為您的毛小孩找到最好的</h2>
        <p>我們的寵物百貨提供各種優質的寵物產品，包括食品、玩具、配件和保健用品。</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button primary onClick={() => navigate('/products')}>瀏覽全部商品</Button>
          <Button>了解更多</Button>
        </div>
      </Card>
      
      {/* 推薦產品區塊 */}
      <div style={{ marginTop: '30px' }}>
        <h2>推薦產品</h2>
        
        {loading ? (
          <p>載入中...</p>
        ) : (
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {featuredProducts.map(product => (
              <Card key={product.id} style={{ 
                flex: '1 1 calc(33.333% - 20px)', 
                minWidth: '250px',
                display: 'flex',
                flexDirection: 'column',
                height: '450px',
                justifyContent: 'space-between'
              }}>
                <img 
                  src={getProductImage(product.category, product.name) || '/placeholder.png'} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '220px', 
                    objectFit: 'contain', 
                    borderRadius: '4px',
                    marginBottom: '12px',
                    backgroundColor: '#f9f9f9'
                  }}
                />
                <h3 style={{ marginBottom: '8px' }}>{product.name}</h3>                
                <p style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#660000',
                  marginBottom: '15px' 
                }}>${product.price}</p>
                
                {/* 按鈕 */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  gap: '10px',
                  marginTop: 'auto' 
                }}>
                  <Button 
                    primary 
                    onClick={() => navigate(`/products`)}
                    style={{ flex: 1, padding: '10px 0' }}
                  >
                    查看商品
                  </Button>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    style={{ flex: 1, padding: '10px 0' }}
                  >
                    直接購買
                  </Button>
                </div></Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
