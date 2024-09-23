import { Route, Switch } from 'wouter'
import Navigation, { NAVIGATION_PATH } from './pages/navigation'
import Home from './pages'
import AdminPage from './pages/admin'
import { ProfessorData } from './data/ProfessorData'
import { useEffect, useState } from 'react'
import { API_URL, ProfessorDataArraySchema } from './server'

type State = {
  professors: ProfessorData[] | null;
  loadingError: string;
}

function App() {

  const [state, setState] = useState<State>({
      professors: [],
      loadingError: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/professors`, {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((result) => {
            console.log("initial get", JSON.stringify(result));
            const data = ProfessorDataArraySchema.safeParse(result);
            console.log("initial get parsed", JSON.stringify(data));
            if (data.success) {
                const value: ProfessorData[] = data.data;
                setState(s => ({ ...s, professors: value, loadingError: "" }));
            } else {
                setState(s => ({ ...s, professors: [], loadingError: "Server error" }));
            }
        })
        .catch(error => {
            console.error(error);
            setState(s => ({ ...s, professors: [], loadingError: "Unknown error" }));
            return null;
        });
  }, []);

  return (
    <>
      {/* 
        Routes below are matched exclusively -
        the first matched route gets rendered
      */}
      <Switch>
        <Route path="/" component={() => <Home professors={state.professors ?? []} />} />
        {/* <Route path="/graph" component={GraphPage} /> */}
        <Route path={NAVIGATION_PATH} component={Navigation} />
        <Route path="/admin" component={() => <AdminPage professors={state.professors ?? []} />} />

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}

export default App
