const ChatMessage = (props) => {
  const { text, uid, photoURL, createdAt } = props.message;
  const time = new Date(createdAt * 1000).toLocaleTimeString();
  const messageClass = uid === props.auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="avatar" />
      <p className="message-text">
        {text} <span className="timestamp">{time}</span>
      </p>
    </div>
  );
};

export default ChatMessage;
