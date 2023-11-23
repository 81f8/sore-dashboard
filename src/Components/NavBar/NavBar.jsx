import Container from "../Container/container";
import Spacer from "../Space/Space";
import "./NavBar.css";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const NavBar = () => {
  return (
    <header>
      <Container>
        <div className="content">
          <h2>Dashboard</h2>
          <div className="user">
            <h4>Admin</h4>
            <Spacer width={5} />
            <Avatar size="Small" icon={<UserOutlined />} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default NavBar;
