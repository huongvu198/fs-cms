import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./config/i18nConfig";
import { IntlProvider } from "react-intl";

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
        <IntlProvider locale="vi-VN">
          <RouterProvider router={router} />
        </IntlProvider>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
