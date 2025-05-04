type Listener = (...args: any[]) => void;

export class EventEmitter {
  private events: Map<string, Listener[]> = new Map();

  on(event: string, listener: Listener): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(listener);
  }

  off(event: string, listener: Listener): void {
    const listeners = this.events.get(event);
    if (!listeners) return;

    this.events.set(
      event,
      listeners.filter((l) => l !== listener),
    );
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach((listener) => listener(...args));
    }
  }

  once(event: string, listener: Listener): void {
    const onceWrapper = (...args: any[]) => {
      this.off(event, onceWrapper);
      listener(...args);
    };
    this.on(event, onceWrapper);
  }

  listeners(event: string): Listener[] {
    return this.events.get(event)?.slice() || [];
  }

  removeAllListeners(event: string): void {
    this.events.delete(event);
  }
}
