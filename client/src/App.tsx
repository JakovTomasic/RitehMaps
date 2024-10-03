import { Route, Switch } from 'wouter'
import Navigation, { NAVIGATION_PATH } from './pages/navigation'
import Home from './pages'
import AdminPage from './pages/admin'
import { useEffect, useState } from 'react'
import { API_URL } from './server'
import { AllMapsData, AllMapsDataSchema } from './data/ServerData'

type State = {
  allMapData: AllMapsData | null,
  loadingError: string;
}

const EMPTY_ALL_MAP_DATA: AllMapsData = {
    nodes: [],
    edges: [],
    hallways: [],
    professors: [],
    submaps: [],
}

function App() {

  const [state, setState] = useState<State>({
      allMapData: null,
      loadingError: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/allData`, {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((result) => {
            console.log("initial get", JSON.stringify(result));
            const data = AllMapsDataSchema.safeParse(result);
            console.log("initial get parsed", JSON.stringify(data));
            if (data.success) {
                const value: AllMapsData = data.data;
                setState(s => ({ ...s, allMapData: value, loadingError: "" }));
            } else {
                setState(s => ({ ...s, allMapData: null, loadingError: "Server error" }));
            }
        })
        .catch(error => {
            console.error(error);
            setState(s => ({ ...s, allMapData: null, loadingError: "Unknown error" }));
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
        <Route path="/" component={() =>
          <>
          { state.allMapData === null ?
            <>loading...</>
            :
            <Home allMapData={state.allMapData ?? EMPTY_ALL_MAP_DATA} />
          }
          </>
        } />
        {/* <Route path="/graph" component={GraphPage} /> */}
        <Route path={NAVIGATION_PATH} component={Navigation} />
        <Route path="/admin" component={() =>
          <>
          { state.allMapData === null ?
            <>loading...</>
            :
            <AdminPage allMapData={state.allMapData ?? EMPTY_ALL_MAP_DATA} />
          }
          </>
        } />

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}

export default App
