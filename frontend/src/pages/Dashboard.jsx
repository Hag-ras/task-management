// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  Card,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tag,
  Space,
  Spin,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import taskService from "../services/task.service";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";

const { Option } = Select;
const { TextArea } = Input;

const statusColors = { pending: "orange", in_progress: "blue", done: "green" };

// --- VIEW FOR LOGGED-IN USERS ---
const LoggedInView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      setTasks(response.data);
    } catch (error) {
      message.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const showTaskModal = (task = null) => {
    setEditingTask(task);
    form.setFieldsValue(
      task
        ? {
            title: task.title,
            description: task.description,
            status: task.status,
          }
        : { title: "", description: "", status: "pending" }
    );
    setIsTaskModalVisible(true);
  };

  const handleTaskCancel = () => {
    setIsTaskModalVisible(false);
    setEditingTask(null);
    form.resetFields();
  };

  const handleTaskFormSubmit = async (values) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, values);
        message.success("Task updated!");
      } else {
        await taskService.createTask(values);
        message.success("Task created!");
      }
      fetchTasks();
      handleTaskCancel();
    } catch (error) {
      message.error("An error occurred.");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      onOk: async () => {
        try {
          await taskService.deleteTask(id);
          message.success("Task deleted!");
          fetchTasks();
        } catch (error) {
          message.error("Failed to delete task.");
        }
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Navbar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Your Tasks
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showTaskModal()}
        >
          New Task
        </Button>
      </div>
      {loading ? (
        <div className="text-center p-10">
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3 }}
          dataSource={tasks}
          renderItem={(task) => (
            <AnimatePresence>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <List.Item>
                  <Card
                    title={task.title}
                    extra={
                      <Tag color={statusColors[task.status]}>
                        {task.status.replace("_", " ").toUpperCase()}
                      </Tag>
                    }
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => showTaskModal(task)}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => handleDelete(task._id)}
                      />,
                    ]}
                  >
                    <p className="text-gray-600 min-h-[20px]">
                      {task.description || "No description"}
                    </p>
                  </Card>
                </List.Item>
              </motion.div>
            </AnimatePresence>
          )}
        />
      )}
      <Modal
        title={editingTask ? "Edit Task" : "Create Task"}
        open={isTaskModalVisible}
        onCancel={handleTaskCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleTaskFormSubmit}
          className="mt-4"
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="in_progress">In Progress</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>
          <Form.Item className="text-right pt-4">
            <Space>
              <Button onClick={handleTaskCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingTask ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// --- VIEW FOR LOGGED-OUT USERS ---
const LoggedOutView = () => {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 mb-4">
            Organize Your Life, Beautifully.
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-8">
            The simple, clean, and modern way to manage your daily tasks. Get
            started for free.
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => setIsAuthModalVisible(true)}
          >
            Get Started
          </Button>
        </motion.div>
      </div>
      <AuthModal
        isVisible={isAuthModalVisible}
        onClose={() => setIsAuthModalVisible(false)}
      />
    </>
  );
};

// --- MAIN DASHBOARD ---
const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setCheckingStatus(false);
  }, []);

  if (checkingStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Checking authentication..." />
      </div>
    );
  }

  return isLoggedIn ? <LoggedInView /> : <LoggedOutView />;
};

export default Dashboard;
