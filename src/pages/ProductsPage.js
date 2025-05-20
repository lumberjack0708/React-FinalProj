import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { addToCart } from '../redux/cartSlice';
import {
  Container,
  Card,
  Heading,
  Button
} from '../styles/styles';

function ProductsPage() {
  // 使用主題
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    // 模擬產品數據
  const [products, setProducts] = useState([
    { id: 1, name: '高級貓糧', price: 980, category: 'food', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: '寵物自動飲水機', price: 1250, category: 'accessories', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: '貓咪隧道玩具', price: 650, category: 'toy', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: '狗狗潔牙骨', price: 320, category: 'food', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: '寵物自動喂食器', price: 1450, category: 'accessories', imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, name: '貓砂盆', price: 550, category: 'accessories', imageUrl: 'https://via.placeholder.com/150' },
  ]);
  
  // 篩選狀態
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // 篩選產品
  const filteredProducts = categoryFilter === 'all' 
    ? products 
    : products.filter(product => product.category === categoryFilter);
  return (
    <Container>
      <Heading theme={theme}>瀏覽全部商品</Heading>
      
      {/* 篩選器 */}
      <Card theme={theme}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label>按類別篩選：</label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              border: `1px solid ${theme === 'light' ? '#4e6bff' : '#7b8cff'}`,
              borderRadius: '4px',
              marginRight: '10px'
            }}
          >
            <option value="all">所有類別</option>
            <option value="food">食品</option>
            <option value="toy">玩具</option>
            <option value="accessories">配件</option>
          </select>
          
          <span>顯示 {filteredProducts.length} 個產品</span>
        </div>
      </Card>
      
      {/* 產品列表 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px 0' }}>
        {filteredProducts.map(product => (
          <Card 
            key={product.id} 
            theme={theme} 
            style={{ flex: '1 1 calc(33.333% - 20px)', minWidth: '250px' }}
          >
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3>{product.name}</h3>
            <p>${product.price}</p>            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <Button 
                theme={theme} 
                primary
                onClick={() => {
                  // 查看詳情，此處可以實現詳情頁，在這個例子中我們只是顯示一個提示
                  alert(`${product.name}\n\n價格: $${product.price}\n\n這是一個優質的寵物產品，您的毛小孩一定會喜歡！`);
                }}
              >
                查看詳情
              </Button>
              <Button 
                theme={theme}
                onClick={() => {
                  dispatch(addToCart(product));
                  alert(`${product.name} 已加入購物車！`);
                }}
              >
                加入購物車
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default ProductsPage;
