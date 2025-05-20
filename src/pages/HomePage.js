import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Container, Card, Heading, Button } from '../styles/styles';

// 模擬取得產品推薦的函數
const fetchFeaturedProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '高級貓糧', price: 980, category: 'food', imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: '寵物自動飲水機', price: 1250, category: 'accessories', imageUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: '貓咪隧道玩具', price: 650, category: 'toy', imageUrl: 'https://via.placeholder.com/150' },
      ]);
    }, 1200);
  });
};

function HomePage() {
  // 使用主題
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // 推薦產品狀態
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 使用 useEffect 獲取推薦產品
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
  
  return (
    <Container>
      <Heading theme={theme}>寵物百貨歡迎您</Heading>
      
      <Card theme={theme}>        <h2>為您的毛小孩找到最好的</h2>
        <p>我們的寵物百貨提供各種優質的寵物產品，包括食品、玩具、配件和保健用品。</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button theme={theme} primary onClick={() => navigate('/products')}>瀏覽全部商品</Button>
          <Button theme={theme}>了解更多</Button>
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
              <Card key={product.id} theme={theme} style={{ flex: '1 1 calc(33.333% - 20px)', minWidth: '250px' }}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h3>{product.name}</h3>                <p>${product.price}</p>
                <Button theme={theme} primary onClick={() => navigate(`/products`)}>查看詳情</Button>              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
