import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { getProductImage } from '../assets/images/index';
import { useNotification } from '../components/Notification';
import { Container, Heading, ProductImage } from '../styles/styles';
import { Card, Button, Typography, Row, Col, Spin, Space, Statistic } from 'antd';
import { ShoppingCartOutlined, EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

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
        <Title level={2}>為您的毛小孩找到最好的</Title>
        <Paragraph>我們的寵物百貨提供各種優質的寵物產品，包括食品、玩具、配件和保健用品。</Paragraph>
        <Space style={{ marginTop: '20px' }}>
          <Button 
            type="primary" 
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate('/products')}
          >
            瀏覽全部商品
          </Button>
          <Button icon={<InfoCircleOutlined />}>了解更多</Button>
        </Space>
      </Card>
      
      {/* 推薦產品區塊 */}
      <div style={{ marginTop: '30px' }}>
        <Title level={2}>推薦產品</Title>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {featuredProducts.map(product => (
              <Col xs={24} sm={12} md={8} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <ProductImage 
                      src={getProductImage(product.category, product.name) || '/placeholder.png'} 
                      alt={product.name}
                    />
                  }
                  actions={[
                    <Button 
                      type="text" 
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/products`)}
                    >
                      查看商品
                    </Button>,
                    <Button 
                      type="text" 
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleAddToCart(product)}
                    >
                      直接購買
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={<Title level={4}>{product.name}</Title>}
                    description={
                      <Statistic 
                        value={product.price} 
                        prefix="$"
                        valueStyle={{ color: '#2B2118', fontSize: '18px' }}
                      />
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
