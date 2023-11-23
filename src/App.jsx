import "./App.css";
import Container from "./Components/Container/container";
import NavBar from "./Components/NavBar/NavBar";
import Spacer from "./Components/Space/Space";
import { useEffect, useState } from "react";
import { Input, Table, Pagination, Button, Modal } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";


function App() {
  const [theproducts, setTheproducts] = useState([]);
  const [totalproducts, setTotalproducts] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [skip, setSkip] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const handleAdd = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchKey}&limit=${limit}&skip=${skip}`
      );
      let res = await response.json();

      setTheproducts(res.products);
      setTotalproducts(res.total);
      setIsloading(false);
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  async function delprodet(id) {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchKey, skip]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "32px",
          }}
        >
          <EditOutlined />
          <Spacer width={29} />
          <DeleteOutlined onClick={() => delprodet(record.id)} />
        </div>
      ),
    },
  ];
  return (
    <>
      <NavBar />
      <Spacer height={24} />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Input
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                setSkip(0);
                setSearchKey(e.target.value);
              }
            }}
            size="small"
            placeholder="Search"
            prefix={
              <SearchOutlined
                style={{
                  color: "gray",
                }}
              />
            }
            style={{
              width: "25%",
              borderRadius: "50px",
              border: "1px solid #000000",
            }}
          />
          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
            type="primary"
            style={{
              backgroundColor: "#000000",
              color: "white",
            }}
          >
            + Add Prodect
          </Button>
        </div>
        <Modal
          title="Add New Product"
          okText="add"
          open={isModalOpen}
          onOk={handleAdd}
          onCancel={handleCancel}
          
        >
        <Spacer height={16} />
        <Table
          columns={columns}
          dataSource={theproducts}
          loading={isloading}
          pagination={false}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem 0",
            width: "100%",
          }}
        >
          <Pagination
            size="Small"
            defaultCurrent={1}
            total={100}
            onChange={(page, pageSize) => {
              setSkip((page - 1) * pageSize);
              setLimit(pageSize);
            }}
          />
        </div>
      </Container>
    </>
  );
}

export default App;
