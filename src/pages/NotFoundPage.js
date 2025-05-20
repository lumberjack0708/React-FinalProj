import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Container, Card, Heading, Button } from '../styles/styles';

function NotFoundPage() {
  // 使用主題
  const { theme } = useTheme();
  
  return (
    <Container>
      <Card theme={theme} style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Heading theme={theme}>404 - 頁面未找到</Heading>
        <p>很抱歉，您所尋找的頁面不存在。</p>
        <p>可能是您輸入的網址有誤，或該頁面已被移除。</p>
        <Button 
          theme={theme} 
          primary 
          onClick={() => window.location.href = '/'}
          style={{ marginTop: '20px' }}
        >
          返回首頁
        </Button>
      </Card>
    </Container>
  );
}

export default NotFoundPage;
