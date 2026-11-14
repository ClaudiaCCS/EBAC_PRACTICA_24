import "./App.css"

import Footer from "./components/Footer/Footer"
import GuideForm from "./components/GuideForm/GuideForm"
import GuideHistory from "./components/GuideHistory/GuideHistory"
import GuideList from "./components/GuideList/GuideList"
import Header from "./components/Header/Header"
import StatusPanel from "./components/StatusPanel/StatusPanel"

function App() {

  return (
    <div className="app">
      <Header />

      <main>
        <GuideForm />

        <StatusPanel />

        <GuideList />

        <GuideHistory />
      </main>

      <Footer />
    </div>
  )
}

export default App
