import React from 'react';
import { Container } from '../styles/styles';

/**
 * @function Footer
 * @description 網站頁尾元件，顯示版權資訊。
 * @returns {JSX.Element} 返回頁尾的 JSX 結構。
 */
function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f2f2f2',
      padding: '20px 0',
      marginTop: '40px',
      textAlign: 'center',
      borderTop: '1px solid #e0e0e0'
    }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {/* 底部可以放置導航連結或社交媒體圖標 */}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
