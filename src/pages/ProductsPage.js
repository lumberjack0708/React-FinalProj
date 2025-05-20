import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { addToCart } from '../redux/cartSlice';
import { getProductImage } from '../assets/images/index';
import { useNotification } from '../components/Notification';
import ProductDetailModal from '../components/ProductDetailModal';
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
  const { notify } = useNotification();
  
  // 模擬產品數據
  const [products, setProducts] = useState([
    { id: 1, name: '高級貓糧', price: 980, category: 'food', imageUrl: null },
    { id: 2, name: '寵物自動飲水機', price: 1250, category: 'accessories', imageUrl: null },
    { id: 3, name: '貓咪隧道玩具', price: 650, category: 'toy', imageUrl: null },
    { id: 4, name: '狗狗潔牙骨', price: 320, category: 'food', imageUrl: null },
    { id: 5, name: '寵物自動喂食器', price: 1450, category: 'accessories', imageUrl: null },
    { id: 6, name: '貓砂盆', price: 550, category: 'accessories', imageUrl: null },
  ]);
  
  // 篩選狀態
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // 產品詳情模態框狀態
  const [selectedProduct, setSelectedProduct] = useState(null);
  
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
            style={{              padding: '8px 12px',
              border: '1px solid #660000',
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
        {filteredProducts.map(product => (          <Card 
            key={product.id} 
            theme={theme} 
            style={{ 
              flex: '1 1 calc(33.333% - 20px)', 
              minWidth: '250px',
              display: 'flex',
              flexDirection: 'column',
              height: '450px',  // 固定高度
              justifyContent: 'space-between'  // 確保內容平均分布
            }}
          >            <img 
              src={getProductImage(product.category, product.name) || '/placeholder.png'} 
              alt={product.name}              style={{ 
                width: '100%', 
                height: '220px', 
                objectFit: 'contain', 
                borderRadius: '4px',
                marginBottom: '12px',
                backgroundColor: '#f9f9f9'
              }}
            />
            <h3 style={{ marginBottom: '8px' }}>{product.name}</h3>            <p style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#660000',
              marginBottom: '15px' 
            }}>${product.price}</p>
            
            {/* 按鈕區域 - 改為水平排列 */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              gap: '10px',
              marginTop: 'auto' 
            }}>              
              <Button 
                theme={theme} 
                primary
                style={{ flex: 1, padding: '10px 0' }}
                onClick={() => {
                  // 顯示產品詳情模態框
                  setSelectedProduct({
                    ...product,
                    imageSource: getProductImage(product.category, product.name) || '/placeholder.png'
                  });
                }}
              >
                查看詳情
              </Button>              <Button 
                theme={theme}
                style={{ flex: 1, padding: '10px 0' }}
                onClick={() => {
                  dispatch(addToCart(product));
                  // 使用通知組件代替 alert
                  notify.success(
                    '已加入購物車', 
                    `${product.name} 已成功加入您的購物車！`
                  );
                }}
              >
                加入購物車
              </Button>
            </div>
          </Card>
        ))}      </div>
      
      {/* 產品詳情模態框 */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            dispatch(addToCart(product));
            notify.success(
              '已加入購物車', 
              `${product.name} 已成功加入您的購物車！`
            );
          }}
        />
      )}
    </Container>
  );
}

export default ProductsPage;
