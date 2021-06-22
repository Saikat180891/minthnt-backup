class Observable {
  constructor() {
    this.value = null;
    this.observer = null;
  }

  next(value) {
    this.value = value;
    this.notify();
  }

  subscribe(observer) {
    if (typeof observer === "function") {
      this.observer = observer;
    }
  }

  notify() {
    this.observer(this.value);
  }

  unsubscribe() {
    this.observer = null;
    this.value = null;
  }
}

export { Observable };
