import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
