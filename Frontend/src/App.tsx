import './styles/global.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import {ConfigProvider, ThemeConfig, theme} from "antd";

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
        <ConfigProvider direction="rtl" theme={getTheme()}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}>
                        </Route>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App
