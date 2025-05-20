import React, { createContext, useContext } from 'react';

// 建立主題上下文
const ThemeContext = createContext();

// 主題提供者組件 - 移除切換功能，固定使用亮色主題
export function ThemeProvider({ children }) {
  // 固定主題為 'light'
  const theme = 'light';

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 自定義 Hook，用於在其他組件中使用主題
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
