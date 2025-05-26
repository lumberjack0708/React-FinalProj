// 從 @emotion/react 導入 css
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

/**
 * @description 專案主要樣式與 styled-components 設定。
 *              包含主題、按鈕、卡片、容器等樣式元件。
 */

// 只保留亮色主題
const colors = {
  light: {
    background: '#f7f7f7',
    text: '#333333',
    primary: '#2B2118',
    secondary: '#A24C00',
  }
};

// 共用樣式
export const globalStyles = css`
  body {
    background-color: #f7f7f7;
    color: #333333;
    transition: all 0.3s ease;
    font-family: 'Noto Sans TC', sans-serif;
  }
`;

// 按鈕樣式
export const Button = styled.button`
  background-color: #2B2118;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

// 容器樣式
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// 卡片樣式
export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

// 標題樣式
export const Heading = styled.h1`
  color: #2B2118;
  margin-bottom: 16px;
`;

// 導航樣式
export const Nav = styled.nav`
  background-color: #2B2118;
  color: white;
  padding: 16px;
  
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      margin: 0 16px;
      
      a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

// 表單輸入框樣式
export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${props => colors[props.theme].primary};
  border-radius: 4px;
  margin-bottom: 16px;
  width: 100%;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(78, 107, 255, 0.3);
  }
`;

// 表單標籤樣式
export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333333;
`;

// 表單組樣式
export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

// 表單錯誤訊息樣式
export const ErrorMessage = styled.p`
  color: #A24C00;
  font-size: 14px;
  margin-top: 4px;
`;
