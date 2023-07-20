import AppNavigator from './navigation/AppNavigator';
import { NotesContextProvider } from './context/NotesContextProvider';

export default function App() {
  return (
    <NotesContextProvider>
      <AppNavigator/>
    </NotesContextProvider>
  );
}
