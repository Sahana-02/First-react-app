import { useRouteError } from 'react-router-dom'
const Error = () => {
  const err = useRouteError()
  console.log(err)
  return <h1>Oopss error occured</h1>
}

export default Error
