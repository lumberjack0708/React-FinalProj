import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Container } from '../styles/styles';

function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer style={{
      backgroundColor: theme === 'light' ? '#f2f2f2' : '#333',
      padding: '20px 0',
      marginTop: '40px',
      textAlign: 'center',
      borderTop: `1px solid ${theme === 'light' ? '#e0e0e0' : '#444'}`
    }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <p style={{ color: theme === 'light' ? '#444' : '#ccc', marginBottom: '16px' }}>
            © 2025 寵物百貨. 版權所有.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
