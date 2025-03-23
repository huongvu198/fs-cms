import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          colorBgContainer: "#ffffff",
        },
        algorithm: undefined,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
