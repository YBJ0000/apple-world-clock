import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GlobalTimeFormatToggle from '../GlobalTimeFormatToggle'

describe('GlobalTimeFormatToggle', () => {
  // 模拟 localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };
  
  beforeEach(() => {
    // 每个测试前重置 localStorage 模拟
    global.localStorage = localStorageMock;
    vi.clearAllMocks();
  });

  it('渲染初始24小时制状态', () => {
    localStorageMock.getItem.mockReturnValue(null); // 模拟返回默认值
    render(<GlobalTimeFormatToggle cities={['Beijing', 'London']} onToggle={() => {}} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Global 12-Hour');
  });

  it('渲染初始12小时制状态', () => {
    localStorageMock.getItem.mockReturnValue('false');
    render(<GlobalTimeFormatToggle cities={['Beijing', 'London']} onToggle={() => {}} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Global 24-Hour');
  });

  it('点击按钮切换格式并更新localStorage', () => {
    const onToggleMock = vi.fn();
    const cities = ['Beijing', 'London'];
    
    localStorageMock.getItem.mockReturnValue(null);
    render(<GlobalTimeFormatToggle cities={cities} onToggle={onToggleMock} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // 验证每个城市的localStorage都被更新
    cities.forEach(city => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        `timeFormat-${city}`,
        false
      );
    });

    // 验证全局设置被更新
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'globalTimeFormat',
      false
    );

    // 验证回调函数被调用
    expect(onToggleMock).toHaveBeenCalledWith(false);
  });

  it('按钮样式正确', () => {
    render(<GlobalTimeFormatToggle cities={[]} onToggle={() => {}} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass(
      'px-4',
      'py-2',
      'rounded-full',
      'bg-orange-500',
      'text-white',
      'hover:bg-orange-600',
      'transition-colors',
      'duration-300',
      'mb-0'
    );
  });
});