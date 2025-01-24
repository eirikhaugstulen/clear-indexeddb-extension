document.getElementById('clearIndexedDBBtn').addEventListener('click', async () => {
    const statusEl = document.getElementById('status');
  
    try {
      // 1. Get the active tab.
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      // 2. Parse out the origin from the tab's URL.
      const url = new URL(tab.url);
      const origin = url.origin; // e.g. "https://example.com"
  
      // 3. Clear IndexedDB for this origin.
      chrome.browsingData.remove(
        { origins: [origin] },
        { indexedDB: true },
        () => {
          statusEl.textContent = `IndexedDB cleared for ${origin}`;
          statusEl.classList.add('show');
  
          setTimeout(() => {
            statusEl.classList.remove('show');
            statusEl.textContent = '';
          }, 3000);
        }
      );
    } catch (error) {
      statusEl.textContent = `Error: ${error.message}`;
      statusEl.classList.add('show');
  
      setTimeout(() => {
        statusEl.classList.remove('show');
        statusEl.textContent = '';
      }, 3000);
    }
  });