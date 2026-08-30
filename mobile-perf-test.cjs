const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...devices['iPhone 12'],
    locale: 'en-US',
  });
  const page = await context.newPage();

  // Throttle CPU to simulate mid-range mobile device
  const client = await page.context().newCDPSession(page);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  // Collect console messages
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));

  // Collect performance entries
  const performanceEntries = [];

  // Navigate and wait for load
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');

  // Wait for intro animation to start (500ms delay in code)
  await page.waitForTimeout(800);

  // Measure frame times during the intro animation
  const frameTimes = await page.evaluate(async () => {
    const times = [];
    let last = performance.now();
    const count = 180; // measure ~3 seconds during intro

    return new Promise(resolve => {
      function frame() {
        const now = performance.now();
        times.push(now - last);
        last = now;
        if (times.length < count) {
          requestAnimationFrame(frame);
        } else {
          resolve(times);
        }
      }
      requestAnimationFrame(frame);
    });
  });

  // Calculate jank metrics
  const jankFrames = frameTimes.filter(t => t > 16.67 * 1.5); // > 25ms
  const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
  const maxFrameTime = Math.max(...frameTimes);

  console.log('=== Mobile Animation Performance Report ===');
  console.log(`Average frame time: ${avgFrameTime.toFixed(2)}ms (${(1000/avgFrameTime).toFixed(1)} fps)`);
  console.log(`Max frame time: ${maxFrameTime.toFixed(2)}ms`);
  console.log(`Jank frames (>25ms): ${jankFrames.length} / ${frameTimes.length} (${(jankFrames.length/frameTimes.length*100).toFixed(1)}%)`);

  // Check for long tasks
  const longTasks = await page.evaluate(async () => {
    if ('PerformanceObserver' in window) {
      const tasks = [];
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          tasks.push({ duration: entry.duration, startTime: entry.startTime });
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
      await new Promise(r => setTimeout(r, 3000));
      observer.disconnect();
      return tasks;
    }
    return [];
  });

  console.log(`Long tasks (>50ms): ${longTasks.length}`);
  longTasks.forEach((t, i) => {
    console.log(`  Task ${i+1}: ${t.duration.toFixed(1)}ms at ${t.startTime.toFixed(0)}ms`);
  });

  // Check for forced synchronous layout (layout thrashing)
  const layoutCount = await page.evaluate(() => {
    return window.__layoutCount || 0;
  });

  // Check DOM nodes count
  const domStats = await page.evaluate(() => {
    return {
      nodes: document.querySelectorAll('*').length,
      animations: document.querySelectorAll('[style*="animation"], [style*="transition"]').length,
      canvases: document.querySelectorAll('canvas').length,
    };
  });

  console.log('DOM stats:', domStats);

  // Check if GSAP is loaded and count tweens
  const gsapStats = await page.evaluate(() => {
    const gsap = window.gsap;
    if (!gsap) return { loaded: false };
    return {
      loaded: true,
      globalTimeline: gsap.globalTimeline ? gsap.globalTimeline.getChildren().length : 0,
      tweens: gsap.globalTimeline ? gsap.globalTimeline.getChildren(true).filter((c) => c.vars).length : 0,
    };
  });
  console.log('GSAP stats:', gsapStats);

  // Check for forced synchronous layouts (layout thrashing)
  const layoutThrashing = await page.evaluate(async () => {
    // Force a layout read after GSAP might have written styles
    const start = performance.now();
    for (let i = 0; i < 10; i++) {
      document.body.offsetHeight; // read
      document.body.style.marginTop = '0px'; // write
    }
    return performance.now() - start;
  });
  console.log(`Layout thrashing test (10 read/write cycles): ${layoutThrashing.toFixed(2)}ms`);

  // Get memory usage
  const memory = await page.evaluate(() => {
    return performance.memory ? {
      usedJSHeapSize: performance.memory.usedJSHeapSize / 1048576,
      totalJSHeapSize: performance.memory.totalJSHeapSize / 1048576,
    } : null;
  });
  if (memory) {
    console.log(`Memory: ${memory.usedJSHeapSize.toFixed(1)}MB used / ${memory.totalJSHeapSize.toFixed(1)}MB total`);
  }

  // Check animation frame budget overruns
  const overruns = frameTimes.filter(t => t > 16.67);
  console.log(`Frames over budget: ${overruns.length} / ${frameTimes.length}`);

  console.log('\nConsole logs:', consoleLogs);

  await browser.close();
})();
