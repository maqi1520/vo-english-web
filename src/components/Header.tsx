import React, { ReactElement } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

const ButtonGroup = Button.Group;

export default function Header(): ReactElement {
  return (
    <header className="header">
      <div className="header-inner clearfix">
        <h1 className="pull-left">VoEnglish</h1>
        <div className="pull-right">
          <ButtonGroup>
            <Link href="/signin">
              <Button>登录</Button>
            </Link>
            <Link href="/signup">
              <Button type="primary">注册</Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </header>
  );
}
