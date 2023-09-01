/**
 * 🎮 Games Dev Framework 🎮
 *          Author:
 *  🔥🎸  Mike Ogden   🎸🔥
 *      ❗ WIP -2023- ❗
 *  This is a simple framework for developing games in the browser.
 *
 * 🏗️ It is designed to be used with the Express JS framework.
 *
 * Initial DOM Manipulation setup  👷‍♂️
 */

window.customElements.define(
  "game-app",
  class GameApp extends HTMLElement {
    constructor() {
      super();
      this.setAttribute("id", "game-app");
    }
  }
);

window.customElements.define(
  "game-canvas",
  class GameCanvas extends HTMLElement {
    constructor() {
      super();
      this.setAttribute("id", "game-canvas");
    }
  }
);

window.customElements.define(
  "STATE",
  class GameThreads extends HTMLElement {
    constructor() {
      super();
      this.setAttribute("id", "STATE");
      this.setAttribute("value", "[],");
    }
  }
);

class StateManager extends Map {
  constructor() {
    super();
    this.state = [];
    this.store = window.CacheStorage;
    this.storeWeight = store.length || 0;
  }

  async apiGET(url, headers) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  setState(state) {
    this.state = state;
    this.storeWeight = this.store.length;
    this.store.setItem(this.storeWeight, this.state);
  }

  getState() {
    return this.state;
  }

  getStore() {
    return this.store;
  }

  getStoreWeight() {
    return this.storeWeight;
  }
}

class Threads {
  constructor() {
    this.threads = [];
  }
}

class Grabbers {
  constructor() {
    this.grabbers = [];
  }
}

const onLoaded = document.addEventListener("DOMContentLoaded", async () => {
  await fetchedData();
  const app = document.getElementById("app-root");
  const content = app.innerHTML;
  app.innerHTML = "";
  app.innerHTML = content;
  return app, content, () => {}, () => {};
});

const fetchedData = async () => {
  const response = await fetch("/api");
  const data = await response.json();
  return data;
};

document.addEventListener("reload", () => {
  const app = document.getElementById("app-root");
  const content = app.innerHTML;
  app.innerHTML = "";
  app.innerHTML = content;
});
