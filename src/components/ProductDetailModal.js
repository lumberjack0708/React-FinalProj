import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../styles/styles';

// 模態對話框背景
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// 模態對話框容器
const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 0;
  animation: scaleIn 0.2s ease-out;
  
  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// 模態對話框頭部
const ModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 模態對話框標題
const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

// 關閉按鈕
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
  
  &:hover {
    color: #666;
  }
`;

// 模態對話框內容
const ModalContent = styled.div`
  padding: 24px;
`;

// 產品圖片容器
const ProductImageContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

// 產品圖片
const ProductImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 4px;
`;

// 產品信息列表
const ProductInfoList = styled.div`
  margin-bottom: 20px;
`;

// 產品信息項
const ProductInfoItem = styled.div`
  display: flex;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// 產品信息標籤
const ProductInfoLabel = styled.div`
  font-weight: 600;
  width: 100px;
  color: #666;
`;

// 產品信息值
const ProductInfoValue = styled.div`
  flex: 1;
`;

// 產品詳情
const ProductDescription = styled.p`
  margin-top: 20px;
  line-height: 1.6;
  color: #444;
`;

// 產品描述區
const DescriptionSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

// 模態對話框底部
const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// 產品詳情模態對話框組件
function ProductDetailModal({ product, onClose, onAddToCart }) {
  const { theme } = useTheme();
  
  // 產品類別中文名稱映射
  const categoryNames = {
    food: '食品',
    toy: '玩具',
    accessories: '配件'
  };
  
  // 產品描述映射
  const productDescriptions = {
    '高級貓糧': '採用天然食材，富含多種營養元素，適合各階段的貓咪食用。特別添加牛磺酸和omega-3脂肪酸，有助於貓咪的眼睛和心臟健康。',
    '寵物自動飲水機': '創新設計，保持水的新鮮流動，鼓勵寵物多喝水。配備靜音水泵和濾網系統，確保寵物飲用的水質乾淨衛生。',
    '貓咪隧道玩具': '優質材料製作，提供安全的遊戲環境。彈出設計方便收納，內部鋪有柔軟的毛絨材料，貓咪玩耍時不會受傷。',
    '狗狗潔牙骨': '特殊形狀設計，可以深入清潔狗狗牙齒的縫隙。添加天然薄荷提取物，幫助口氣清新，同時可增強牙齒健康。',
    '寵物自動喂食器': '可程式設定定時投放食物，確保寵物按時進食。大容量食物儲存盒，減少頻繁添加食物的次數。適合短期外出的家庭使用。',
    '貓砂盆': '半封閉式設計，減少貓砂散落。底部附有過濾網，方便清理貓砂。優質PP材質，堅固耐用，易於清洗。'
  };
  
  // 產品規格映射
  const productSpecs = {
    '高級貓糧': '3kg/包',
    '寵物自動飲水機': '容量: 2L',
    '貓咪隧道玩具': '長度: 120cm，直徑: 25cm',
    '狗狗潔牙骨': '10支/包',
    '寵物自動喂食器': '容量: 4L',
    '貓砂盆': '尺寸: 45x35x40cm'
  };
  
  // 禁止背景滾動
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // 處理點擊背景關閉
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{product.name}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <ModalContent>
          <ProductImageContainer>
            <ProductImage 
              src={product.imageSource} 
              alt={product.name} 
            />
          </ProductImageContainer>
          
          <ProductInfoList>
            <ProductInfoItem>
              <ProductInfoLabel>價格</ProductInfoLabel>
              <ProductInfoValue style={{ color: '#660000', fontWeight: 'bold' }}>
                ${product.price}
              </ProductInfoValue>
            </ProductInfoItem>
            
            <ProductInfoItem>
              <ProductInfoLabel>類別</ProductInfoLabel>
              <ProductInfoValue>
                {categoryNames[product.category] || product.category}
              </ProductInfoValue>
            </ProductInfoItem>
            
            <ProductInfoItem>
              <ProductInfoLabel>規格</ProductInfoLabel>
              <ProductInfoValue>
                {productSpecs[product.name] || '標準規格'}
              </ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoList>
          
          <DescriptionSection>
            <h3>產品介紹</h3>
            <ProductDescription>
              {productDescriptions[product.name] || 
                '這是一個優質的寵物產品，專為您的毛小孩設計，保證品質與安全性。'}
            </ProductDescription>
          </DescriptionSection>
        </ModalContent>
        
        <ModalFooter>
          <Button 
            theme={theme} 
            onClick={onClose}
          >
            關閉
          </Button>
          <Button 
            theme={theme}
            primary
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            加入購物車
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ProductDetailModal;
