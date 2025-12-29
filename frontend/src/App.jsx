// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const { Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-2 sm:p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
