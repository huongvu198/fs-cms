import { useState } from "react";
import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MessageGroup,
  Message,
  MessageList,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import PageContent from "src/components/common/PageContent";
import { Row, Col, Badge } from "antd";

const conversations = [
  {
    id: "1",
    name: "User 1",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg",
    messages: ["Hello", "How are you?"],
    typing: false,
    unread: 1,
  },
  {
    id: "2",
    name: "User 2",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg",
    messages: ["Hi", "I need support"],
    typing: true,
    unread: 1,
  },
  {
    id: "3",
    name: "User 3",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg",
    messages: ["Hey", "Can you help me?"],
    typing: false,
    unread: 2,
  },
];

const ChatManagement = () => {
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<{ [key: string]: string[] }>({
    "1": ["Hello", "How are you?"],
    "2": ["Hi", "I need support"],
    "3": ["Hey", "Can you help me?"],
  });
  const [inputValue, setInputValue] = useState("");

  const handleConversationClick = (id: string) => {
    setActiveConversationId(id);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeConversationId) return;

    setMessages((prev) => ({
      ...prev,
      [activeConversationId]: [...prev[activeConversationId], inputValue],
    }));

    setInputValue("");
  };

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );
  const activeMessages = activeConversationId
    ? messages[activeConversationId]
    : [];

  return (
    <PageContent
      title="Liên hệ hỗ trợ"
      contentSX={{
        backgroundColor: "#F0F2F5",
        border: "none",
        boxShadow: "none",
      }}
      bodySX={{
        padding: 0,
      }}
    >
      <Row gutter={32} style={{ height: "85vh", display: "flex" }}>
        <Col
          span={6}
          style={{
            borderRadius: 8,
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.04)",
            backgroundColor: "#FFFFFF",
            paddingLeft: 16,
            paddingRight: 0,
            paddingTop: 8,
          }}
        >
          <Sidebar
            position="left"
            scrollable
            style={{ width: "96%", margin: "auto" }}
          >
            <ConversationList>
              {conversations.map((conv) => (
                <Conversation
                  key={conv.id}
                  name={conv.name}
                  active={conv.id === activeConversationId}
                  onClick={() => handleConversationClick(conv.id)}
                  unreadDot={true}
                  style={{
                    position: "relative",
                    border:
                      conv.id === activeConversationId
                        ? "1px solid #1890ff"
                        : "1px solid transparent",
                    borderRadius: 8,
                    padding: "8px",
                    transition: "border 0.3s",
                    marginBottom: 8,
                    backgroundColor:
                      conv.id === activeConversationId ? "#E6F7FF" : "#FFFFFF",
                    color:
                      conv.id === activeConversationId ? "#1890ff" : "#1F1F1F",
                  }}
                >
                  <Avatar src={conv.avatar} name={conv.name} />
                </Conversation>
              ))}
            </ConversationList>
          </Sidebar>
        </Col>
        <Col span={18}>
          <MainContainer style={{ width: "100%" }}>
            {activeConversation ? (
              <ChatContainer style={{ flex: 1, width: "100%" }}>
                <ConversationHeader>
                  <Avatar
                    src={activeConversation.avatar}
                    name={activeConversation.name}
                  />
                  <ConversationHeader.Content
                    userName={activeConversation.name}
                  />
                </ConversationHeader>

                <MessageList
                  typingIndicator={
                    activeConversation.typing ? (
                      <TypingIndicator
                        content={`${activeConversation.name} đang nhập...`}
                      />
                    ) : null
                  }
                >
                  {activeMessages.map((msg, index) => (
                    <MessageGroup key={index} direction="incoming">
                      <Message>{msg}</Message>
                    </MessageGroup>
                  ))}
                </MessageList>

                <MessageInput
                  placeholder="Nhập tin nhắn..."
                  attachButton
                  value={inputValue}
                  onChange={setInputValue}
                  onSend={handleSendMessage}
                />
              </ChatContainer>
            ) : (
              <div
                style={{
                  width: "100%",
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>Chọn một cuộc hội thoại để bắt đầu</div>
              </div>
            )}
          </MainContainer>
        </Col>
      </Row>
    </PageContent>
  );
};

export default ChatManagement;
