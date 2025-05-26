import React from 'react';
import { Container, Card, Heading, Button } from '../styles/styles';

/**
 * @function NotFoundPage
 * @description 404 頁面元件，當路由找不到對應頁面時顯示。
 * @returns {JSX.Element} 返回 404 頁面的 JSX 結構。
 */
function NotFoundPage() {
  return (
    <Container>
      <Card style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Heading>404 - 頁面未找到</Heading>
        <p>很抱歉，您所尋找的頁面不存在。</p>
        <p>可能是您輸入的網址有誤，或該頁面已被移除。</p>
        <Button 
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
