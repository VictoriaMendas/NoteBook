import { createBrowserRouter } from "react-router-dom";
import NotesListPage from "./pages/NotesListPage/NotesListPage";
import CreateNotePage from "./pages/CreateNotePage/CreateNotePage";
import EditNotePage from "./pages/EditNotePage/EditNotePage";

import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <NotesListPage />,
      },
      {
        path: "create",
        element: <CreateNotePage />,
      },
      {
        path: "edit/:id",
        element: <EditNotePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
