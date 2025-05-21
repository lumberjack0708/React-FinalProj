import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { NotificationProvider } from './components/Notification';
import { Nav, ThemeWrapper, Button } from './styles/styles';
import { CartProvider, useCart } from './contexts/CartContext';
import 'normalize.css'; // 引入 normalize.css

function AppContent() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // 使用 Context API 代替 Redux
  const { items: cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <ThemeWrapper>
      <Nav theme={theme}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{ width: '100px' }}></div> {/* 左側空白區，用於平衡布局 */}
          
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
                background: theme === 'light' ? '#ff5e7b' : '#ff7b97',
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
      </Nav>      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      <Footer />
    </ThemeWrapper>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
