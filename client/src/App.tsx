import { Route, Switch } from 'wouter'
import Navigation, { NAVIGATION_PATH } from './pages/navigation'
import GraphPage from './pages/graph'
import Home from './pages'

function App() {
  return (
    <>
      {/* 
        Routes below are matched exclusively -
        the first matched route gets rendered
      */}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/graph" component={GraphPage} />
        <Route path={NAVIGATION_PATH} component={Navigation} />

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}

export default App
