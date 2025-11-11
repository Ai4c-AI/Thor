
import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderNavigation } from '../../components/layouts/header-navigation';

export default function DefaultLayout() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      {/* 添加顶部间距以避免内容被固定头部遮挡 */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}