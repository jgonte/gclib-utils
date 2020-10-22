import Observer from '../../src/observer/Observer';
import Subscriber from '../../src/observer/Subscriber';

const values: string[] = []

beforeEach(() => {
  values.length = 0
})

class Observed implements Subscriber {
  constructor(public name: string) {}

  onNotify() {
    values.push(this.name)
  }
}

describe('Observer test', () => {
  it('without subscribers it notifies nothing', async () => {
    const observer = new Observer()

    observer.notify()

    expect(values).toEqual([])
  })

  it('subscribes and notify subscribers', async () => {
    const observer = new Observer()

    observer.subscribe(new Observed('observed1'))

    observer.subscribe(new Observed('observed2'))

    observer.notify()

    expect(values).toEqual(['observed1', 'observed2'])
  })

  it('subscribes, unsubscribes and notify subscribers', async () => {
    const observer = new Observer()

    observer.subscribe(new Observed('observed1'))

    const observed = new Observed('observed2')

    observer.subscribe(observed)

    observer.subscribe(new Observed('observed3'))

    observer.unsubscribe(observed)

    observer.notify()

    expect(values).toEqual(['observed1', 'observed3'])
  })
})
