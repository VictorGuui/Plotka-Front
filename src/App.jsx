import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './home'
function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  )
}

export default App
