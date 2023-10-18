export type FirestoreTodo = { text: string; checked: boolean; uid: string };
export type FirestoreUser = { todos: FirestoreTodo[] };
