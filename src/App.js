import { useState, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import ChatRoom from "./ChatRoom";
import "./App.css";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const scroll = useRef();
  const [user] = useAuthState(auth);
  const [formValue, setFormValue] = useState("");

  const messagesRef = firestore.collection("messages");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <header>
        <h1>Firechat</h1>
        <SignOut auth={auth} />
      </header>
      <section>
        {user ? (
          <>
            <ChatRoom
              messagesRef={messagesRef}
              auth={auth}
              firestore={firestore}
              scroll={scroll}
            />{" "}
            <form onSubmit={sendMessage}>
              <input
                placeholder="say something"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
              />
              <button type="submit" disabled={!formValue}>
                <span role="img" aria-label="dove">
                  🕊
                </span>
              </button>
            </form>
          </>
        ) : (
          <SignIn auth={auth} />
        )}
      </section>
    </div>
  );
}

export default App;
