import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

const ChatRoom = ({ firestore, auth, messagesRef, scroll }) => {
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <main>
      {messages &&
        messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} auth={auth} />
        ))}
      <span ref={scroll}></span>
    </main>
  );
};

export default ChatRoom;
