// src/components/AuthModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  AppleFilled,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../services/auth.service";
import AppLogo from "./AppLogo";

const AuthModal = ({ isVisible, onClose }) => {
  const [isRegisterView, setIsRegisterView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleAuthFinish = async (values) => {
    setLoading(true);
    try {
      if (isRegisterView) {
        await authService.register(values.name, values.email, values.password);
        message.success("Registration successful! Please log in.");
        setIsRegisterView(false); // Switch to login view
      } else {
        await authService.login(values.email, values.password);
        message.success("Welcome back!");
        onClose();
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "An unknown error occurred.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      width={400}
      bodyStyle={{ padding: "0" }}
    >
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            <AppLogo />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isRegisterView ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500">
            {isRegisterView
              ? "Get started with your new account."
              : "Log in to continue."}
          </p>
        </div>

        {/* Social Logins */}
        <div className="space-y-2">
          <Button icon={<GoogleOutlined />} size="large" block>
            Continue with Google
          </Button>
          <Button icon={<AppleFilled />} size="large" block>
            Continue with Apple
          </Button>
        </div>

        <Divider>OR</Divider>

        {/* Form Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isRegisterView ? "register" : "login"}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Form
              form={form}
              name="auth-form"
              onFinish={handleAuthFinish}
              layout="vertical"
              size="large"
            >
              {isRegisterView && (
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your Name!" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Full Name" />
                </Form.Item>
              )}
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid Email!",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              {!isRegisterView && (
                <div className="text-right -mt-2 mb-4">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  {isRegisterView ? "Create Account" : "Log In"}
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        </AnimatePresence>

        {/* Switch between Login/Register */}
        <div className="text-center text-gray-600 mt-4">
          {isRegisterView ? (
            <span>
              Already have an account?{" "}
              <a
                onClick={() => setIsRegisterView(false)}
                className="font-semibold text-blue-600 cursor-pointer hover:underline"
              >
                Log in
              </a>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <a
                onClick={() => setIsRegisterView(true)}
                className="font-semibold text-blue-600 cursor-pointer hover:underline"
              >
                Sign up
              </a>
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
