export function EmergePaySubmitted(settings) {
    window.chrome.webview.postMessage({EVENT_TYPE: settings});
  }