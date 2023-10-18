import { Box, Container } from "@mui/material";
import { auth, firestore } from "../../App";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import UserBar from "./user_bar";
import { FirestoreTodo, FirestoreUser } from "./types";
import CompletedRemainingStatuses from "./statuses";
import TodoItems from "./items";
import InputBar from "./input";

function Home() {
  // AUTH
  const [user] = useAuthState(auth);

  // DATA REFERENCES
  const USER_UID = user!.uid;
  const usersCollection = firestore.collection("users");
  const userDoc = usersCollection.doc(USER_UID);

  // ON INITIAL MOUNT
  useEffect(() => {
    // 1/2: helpers
    function initializeUserInDatabase() {
      usersCollection.doc(USER_UID).set({
        todos: [],
      });
    }
    function readAndSetUserTodos(firestoreUser: FirestoreUser) {
      if (firestoreUser.todos) {
        setTodoItems(firestoreUser.todos);
      } else {
        userDoc.update({
          todos: [],
        });
        setTodoItems([]);
      }
    }

    // 2/2: Attach a real-time listener to fire on each change in user document
    const unsubscribe = userDoc.onSnapshot((doc) => {
      if (doc.exists) {
        const user = doc.data() as FirestoreUser;

        if (user === undefined)
          throw new Error(
            "Issue occurred while reading user data. Please contact owner using contact options provided on stevencruz.dev"
          );

        readAndSetUserTodos(doc.data() as FirestoreUser);
      } else {
        initializeUserInDatabase();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // STATES
  const [todoItems, setTodoItems] = useState<FirestoreTodo[]>([]);

  // HANDLERS
  function handlePostTodo(text: string) {
    const uid = uuidv4();

    if (text.trim() === "") return; // Avoid adding empty todos
    userDoc.update({
      todos: firebase.firestore.FieldValue.arrayUnion({
        text: text,
        checked: false,
        uid: uid,
      } as FirestoreTodo),
    });
  }

  function handleItemClick(uid: string) {
    const oldCheckStatus = todoItems.find((i) => i.uid === uid)?.checked;
    const newCheckStatus: boolean = !oldCheckStatus;

    const newTodos = [...todoItems];
    const i = newTodos.findIndex((item) => item.uid === uid);
    newTodos[i].checked = newCheckStatus;

    userDoc.update({
      todos: newTodos,
    });
  }

  function handleItemDelete(uid: string) {
    const itemIndex = todoItems.findIndex((item) => item.uid === uid);

    if (itemIndex !== -1) {
      const newTodos = [...todoItems];
      newTodos.splice(itemIndex, 1);
      setTodoItems(newTodos);
      userDoc.update({
        todos: newTodos,
      });
    }
  }

  // DOM HIERARCHY
  return (
    <Container
      maxWidth="md"
      sx={{ mt: "10rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
    >
      <UserBar />

      <CompletedRemainingStatuses
        completed={todoItems.filter((i) => i.checked).length}
        remaining={todoItems.filter((i) => !i.checked).length}
      />

      <TodoItems
        items={todoItems}
        onItemClick={(uid: string) => handleItemClick(uid)}
        onItemDelete={(uid: string) => handleItemDelete(uid)}
      />

      <Box pb="15rem" width="100%" sx={{ display: "flex", alignItems: "center" }}>
        <InputBar onPost={(todo: string) => handlePostTodo(todo)} />
      </Box>
    </Container>
  );
}

export default Home;
