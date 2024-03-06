


const parent = React.createElement("div",{id:"parent"},
React.createElement("child",{id:"child"},
React.createElement("h1",{},"I am h1 tag")))
const heading = React.createElement("h1",{id:"heading"},"Hello World from React");
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(parent)
