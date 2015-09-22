 
  // Attach a boolean to WebCopy to indicatewhether it is supported in this browser 
  WebCopy.isSupported = isSupported(navigator, document);
  
  // Insert WebCopy styles at the end of the document head.
  // Full styles if WebCopy is supported in this browser, else styles to hide the dummy span
  insertStyles(WebCopy.isSupported);

  // Attach the WebCopy constructor to the window object to allow it to be called
  window.WebCopy = WebCopy;
