// 匯入必要的 CSS 檔案和 React Router DOM 元件
import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// 匯入頁面級元件
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
// 匯入共用元件
import Footer from './components/Footer';
// 匯入通知相關的 Provider
import { NotificationProvider } from './components/Notification';
// 匯入樣式化元件
import { Nav } from './styles/styles';
// 匯入 Redux 相關函數和選擇器
import { useSelector } from 'react-redux';
import { selectCartItemCount } from './store/cartSlice';
// 匯入 normalize.css 標準化瀏覽器樣式
import 'normalize.css'; 

/**
 * @function AppContent
 * @description 應用程式的主要內容元件，包含導覽列、路由設定和頁尾。
 * @returns {JSX.Element} 返回應用程式內容的 JSX 結構。
 */
function AppContent() {
  const navigate = useNavigate();
  const cartItemCount = useSelector(selectCartItemCount);   // 使用 Redux 選擇器獲取購物車商品數量
  
  return (
    <>
      <Nav>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{ width: '100px' }}></div> 
          <ul style={{ 
            display: 'flex', 
            justifyContent: 'center',
            flex: 1
          }}>
            <li><Link to="/">首頁</Link></li>
            <li><Link to="/products">瀏覽全部商品</Link></li>
            <li><Link to="/cart">購物車</Link></li>
          </ul>
          <div 
            onClick={() => navigate('/cart')}
            style={{
              position: 'relative',
              cursor: 'pointer',
              width: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '30px',
                background: '#ff5e7b',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
      </Nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

/**
 * @function App
 * @description 應用程式的根元件。
 * @returns {JSX.Element} 返回包裹了 NotificationProvider 的 AppContent 元件。
 */
function App() {
  return (
    // 全域通知
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;
