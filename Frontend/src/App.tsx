import './styles/global.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import {ConfigProvider, theme, ThemeConfig, App as AntApp} from "antd";
import {StyleProvider} from '@ant-design/cssinjs';
import {Provider} from "react-redux";
import store from "@housing_rent/redux/store";
import TestPage from "@housing_rent/pages/test";
import RentHousesPage from "@housing_rent/pages/RentHousesPage";
import MyHousesPage from "@housing_rent/pages/MyHousesPage";
import Admin from "@housing_rent/pages/admin";
import AdminPage from "@housing_rent/pages/admin";

const getTheme = (isDark?: boolean): ThemeConfig => ({
    token: {
        fontSize: 14,
        colorPrimary: import.meta.env.VITE_COLOR_PRIMARY ?? '#e6be2a',
        colorFillSecondary: import.meta.env.VITE_COLOR_SECONDARY,
        fontFamily: 'vazirmatn',
        colorLink: import.meta.env.VITE_COLOR_PRIMARY ?? '#e6be2a',
        colorPrimaryBg: import.meta.env.VITE_COLOR_PRIMARY,
    },
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
});

function App() {
    return (
        <Provider store={store}>
            <AntApp>
                <ConfigProvider direction="rtl" theme={getTheme()}>
                    <StyleProvider hashPriority="high">
                        <BrowserRouter>
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<Home/>}>
                                    </Route>
                                    <Route path="/rented" element={<RentHousesPage/>}></Route>
                                    <Route path="/test" element={<TestPage/>}></Route>
                                    <Route path="/my/estates" element={<MyHousesPage/>}></Route>
                                    <Route path="/admin" element={<AdminPage/>}></Route>
                                </Routes>
                            </Layout>
                        </BrowserRouter>
                    </StyleProvider>
                </ConfigProvider>
            </AntApp>
        </Provider>
    );
}

export default App
