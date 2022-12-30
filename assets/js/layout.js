console.log('hi i am working');
setTimeout(() => {
    const box = document.getElementById('flash');
  
    // 👇️ removes element from DOM
    box.style.display = 'none';
  
  }, 3400); 