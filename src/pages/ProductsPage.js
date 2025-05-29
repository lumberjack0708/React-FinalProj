import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { getProductImage } from '../assets/images/index';
import { useNotification } from '../components/Notification';
import ProductDetailModal from '../components/ProductDetailModal';
// 引入 Ant Design 元件
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Button, 
  Select, 
  Space, 
  Statistic, 
  Badge,
  Divider,
  Radio,
  Tooltip
} from 'antd';
import { 
  ShoppingCartOutlined, 
  EyeOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  AppstoreOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
// 引入保留的 Emotion 樣式組件
import {
  Container,
  Heading,
  ProductImage
} from '../styles/styles';

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * @function ProductsPage
 * @description 商品列表頁面，顯示所有商品並可加入購物車。
 * @returns {JSX.Element} 返回商品頁面的 JSX 結構。
 */

function ProductsPage() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  
  const dispatch = useDispatch(); // 使用 Redux dispatch
  
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
  const [sortOrder, setSortOrder] = useState('default');
  
  // 產品詳情模態框狀態
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // 處理頁面滾動時固定排序按鈕的問題
  useEffect(() => {
    const handleScroll = () => {
      // 當頁面滾動時，強制更新按鈕組的狀態
      const radioButtons = document.querySelectorAll('.ant-radio-button-wrapper-checked');
      radioButtons.forEach(button => {
        // 移除並重新添加選中狀態，確保按鈕不會保持選中狀態
        if (button.classList.contains('ant-radio-button-wrapper-checked')) {
          button.classList.remove('ant-radio-button-wrapper-checked');
          setTimeout(() => {
            button.classList.add('ant-radio-button-wrapper-checked');
          }, 0);
        }
      });
    };

    // 添加滾動事件監聽器
    window.addEventListener('scroll', handleScroll);
    
    // 清理函數，組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 添加商品到購物車的處理函數
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    notify.success(
      '已加入購物車', 
      `${product.name} 已成功加入您的購物車！`
    );
  };
  
  // 處理排序改變
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    // 延遲處理以確保 DOM 已更新
    setTimeout(() => {
      // 修復選中狀態顯示問題
      const checkedButton = document.querySelector(`.ant-radio-button-wrapper[data-value="${e.target.value}"]`);
      if (checkedButton) {
        const allButtons = document.querySelectorAll('.ant-radio-button-wrapper');
        allButtons.forEach(btn => {
          btn.classList.remove('ant-radio-button-wrapper-checked');
        });
        checkedButton.classList.add('ant-radio-button-wrapper-checked');
      }
    }, 0);
  };
  
  // 篩選產品
  let filteredProducts = categoryFilter === 'all' 
    ? [...products] 
    : [...products].filter(product => product.category === categoryFilter);

  // 排序產品
  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // 類別選項
  const categoryOptions = [
    { value: 'all', label: '所有類別' },
    { value: 'food', label: '食品' },
    { value: 'toy', label: '玩具' },
    { value: 'accessories', label: '配件' }
  ];

  return (
    <Container>
      <Heading>瀏覽全部商品</Heading>
      
      {/* 篩選器UI */}
      <Card style={{ marginBottom: 20 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={9}>
            <Space align="center">
              <FilterOutlined style={{ fontSize: '16px', color: '#2B2118' }} />
              <Text strong>按類別篩選：</Text>
              <Select 
                value={categoryFilter} 
                onChange={setCategoryFilter}
                style={{ width: 150 }}
              >
                {categoryOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
          
          <Col xs={24} lg={10}>
            <Space size="middle" style={{ display: 'flex', flexWrap: 'nowrap' }}>
              <SortAscendingOutlined style={{ fontSize: '16px', color: '#2B2118' }} />
              <Text strong>排序：</Text>
              <Radio.Group 
                value={sortOrder} 
                onChange={handleSortChange}
                optionType="button"
                buttonStyle="solid"
                size="middle"
                style={{ whiteSpace: 'nowrap' }}
                className="sort-radio-group"
                destroyInactiveOptions={true}
              >
                <Radio.Button value="default" className="sort-radio-button" data-value="default">預設</Radio.Button>
                <Radio.Button value="price-asc" className="sort-radio-button" data-value="price-asc">價格↑</Radio.Button>
                <Radio.Button value="price-desc" className="sort-radio-button" data-value="price-desc">價格↓</Radio.Button>
              </Radio.Group>
            </Space>
          </Col>
          
          <Col xs={24} lg={5} style={{ textAlign: 'right' }}>
            <Tooltip title="商品總數">
              <Statistic 
                title={
                  <Space>
                    <AppstoreOutlined style={{ fontSize: '16px', color: '#2B2118' }} />
                    <Text strong>商品數量</Text>
                  </Space>
                }
                value={filteredProducts.length} 
                valueStyle={{ fontSize: '18px', color: '#2B2118', fontWeight: 'bold' }}
                prefix={<UnorderedListOutlined />}
                suffix="件"
              />
            </Tooltip>
          </Col>
        </Row>
      </Card>
      
      {/* 產品列表 */}
      <Row gutter={[16, 16]}>
        {filteredProducts.map(product => (
          <Col xs={24} sm={12} md={8} key={product.id}>
            <Badge.Ribbon 
              text={
                product.category === 'food' ? '食品' :
                product.category === 'toy' ? '玩具' : '配件'
              } 
              color={
                product.category === 'food' ? 'green' :
                product.category === 'toy' ? 'geekblue' : 'volcano'
              }
            >
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
                    onClick={() => {
                      setSelectedProduct({
                        ...product,
                        imageSource: getProductImage(product.category, product.name) || '/placeholder.png'
                      });
                    }}
                  >
                    查看詳情
                  </Button>,
                  <Button 
                    type="text" 
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(product)}
                  >
                    加入購物車
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
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      
      {/* 產品詳情模態框 */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </Container>
  );
}

export default ProductsPage;
