class EventBus {
  emit(event: string, detail?: unknown) {
    window.dispatchEvent(new CustomEvent(event, { detail }));
  }

  on(event: string, callback: (e: CustomEvent) => void) {
    window.addEventListener(event, callback as EventListener);
  }

  off(event: string, callback: (e: CustomEvent) => void) {
    window.removeEventListener(event, callback as EventListener);
  }
}

export const eventBus = new EventBus();
