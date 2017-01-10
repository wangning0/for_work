import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {renderToString} from 'react-dom/server';
import counterApp from './reducers';
import App from './containers/App';

const app = Express();
const port = 3000;

// 每当收到请求时都会触发
app.use(handleRender);

// 接下来会补充这部分代码
function handleRender(req, res) { 
  const store = createStore(counterApp);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const initialState = store.getState();

  res.send(renderFullPage(html, initialState));
}
function renderFullPage(html, initialState) { 
  return `
    <!doctype html>
    <html>
      <head>
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `
}

app.listen(port);