function next(value) {
  console.log(value);
}
function error(value) {}
function complete() {
  console.log('completed');
}
class Observable {
  constructor(producer) {
    this.producer = producer;
  }
  subscribe(observer) {
    return this.producer(observer);
  }
}

const interval$ = new Observable(function producer(observer) {
  let value = 0;
  const id = setInterval(function() {
    observer.next(value++);
  }, 1000);

  return {
    unsubscribe() {
      console.log('unsubscribed');
      observer.complete();
      clearInterval(id);
    }
  };
});
// const interval$ = interval(1000);

const observer = {
  next,
  error,
  complete
};

const sub = interval$.subscribe(observer);
sub.unsubscribe();
