import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DAppProvider, Kovan } from "@usedapp/core"
import { Header } from "./components/Header"
import { Container } from "@material-ui/core"
import { Main } from './components/Main';
import { getDefaultProvider } from 'ethers'

function App() {
  return (
    <DAppProvider config={{
      networks: [Kovan],
      readOnlyUrls: {
        [Kovan.chainId]: getDefaultProvider('kovan'),
      },
    }}>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </DAppProvider>
  );
}

export default App;
