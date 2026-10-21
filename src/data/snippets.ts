import { Snippet } from '../types';

export const JAVASCRIPT_SNIPPETS: Snippet[] = [
  {
    id: 'modern-features',
    title: 'Modern JavaScript (ES2024+)',
    category: 'Modern ES6+',
    description: 'Object.groupBy, structuredClone, Array immutability methods, and optional chaining.',
    mode: 'console',
    code: `// Modern JavaScript ES2024+ features
console.time("Modern Features Demo");

// 1. Object.groupBy (native array grouping)
const inventory = [
  { name: "Asparagus", type: "vegetables", quantity: 5 },
  { name: "Bananas", type: "fruit", quantity: 0 },
  { name: "Goat", type: "meat", quantity: 23 },
  { name: "Cherries", type: "fruit", quantity: 12 },
  { name: "Fish", type: "meat", quantity: 22 },
];

const grouped = Object.groupBy(inventory, ({ type }) => type);
console.log("Grouped by Category:");
console.table(grouped.fruit);

// 2. Array immutability methods: toSorted, toReversed, with
const originalScores = [88, 42, 95, 73, 61];
const sortedScores = originalScores.toSorted((a, b) => a - b);
const swappedScores = originalScores.with(1, 99); // replace index 1 without mutation

console.log("Original array untouched:", originalScores);
console.log("Immutable sorted:", sortedScores);
console.log("With index 1 updated to 99:", swappedScores);

// 3. Deep cloning with structuredClone (handles Maps, Sets, Dates)
const complexObj = {
  id: 101,
  created: new Date(),
  tags: new Set(["javascript", "es2024"]),
  nested: { metadata: { verified: true } }
};
const cloned = structuredClone(complexObj);
cloned.nested.metadata.verified = false;

console.log("Original obj verified:", complexObj.nested.metadata.verified);
console.log("Cloned obj verified:", cloned.nested.metadata.verified);

console.timeEnd("Modern Features Demo");
return { totalItems: inventory.length, sortedScores };`
  },
  {
    id: 'async-orchestration',
    title: 'Async / Await & Concurrency',
    category: 'Async & Promises',
    description: 'Demonstrating Promise.allSettled, parallel vs sequential async flows, and retry with backoff.',
    mode: 'console',
    code: `// Async Orchestration & Promise Patterns
console.log("Initiating asynchronous tasks...");

// Simulated network request with random latency and failure
const fetchSensorData = (sensorId, failRate = 0.2) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 200) + 100;
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error(\`Sensor \${sensorId} connection dropped\`));
      } else {
        resolve({ sensorId, reading: +(Math.random() * 100).toFixed(2), latency: delay });
      }
    }, delay);
  });
};

// 1. Parallel execution with Promise.allSettled
console.time("Parallel Execution");
const tasks = [1, 2, 3, 4, 5].map(id => fetchSensorData(id, 0.3));
const results = await Promise.allSettled(tasks);
console.timeEnd("Parallel Execution");

const successful = results
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value);

const failed = results
  .filter(r => r.status === 'rejected')
  .map(r => r.reason.message);

console.log(\`Successfully fetched \${successful.length} sensor readings:\`);
console.table(successful);

if (failed.length > 0) {
  console.warn("Sensors that experienced failures:", failed);
}

// 2. Exponential Backoff Retry Pattern
async function retryWithBackoff(fn, retries = 3, delay = 50) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(\`Retry attempt \${attempt} failed, waiting \${delay}ms...\`);
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
}

const recoveredData = await retryWithBackoff(() => fetchSensorData('BACKUP-01', 0.5));
console.log("Backup sensor data retrieved successfully:", recoveredData);

return { successfulSensors: successful.length, failures: failed.length };`
  },
  {
    id: 'lru-cache',
    title: 'Data Structure: LRU Cache',
    category: 'Algorithms',
    description: 'A clean, high-performance O(1) Least Recently Used cache using JavaScript Map.',
    mode: 'console',
    code: `// High-Performance LRU (Least Recently Used) Cache
// Leveraging the insertion-order guarantee of JavaScript's Map for O(1) get and put

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    // Refresh item position by removing and re-inserting to end
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least recently used (first key in map)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
      console.log(\`[Evicted LRU key]: \${oldestKey}\`);
    }
    this.cache.set(key, value);
  }

  get state() {
    return Array.from(this.cache.entries()).map(([k, v]) => ({ key: k, value: v }));
  }
}

// Test the Cache
console.log("Initializing LRU Cache with capacity = 3");
const lru = new LRUCache(3);

lru.put("user:101", { name: "Alice", role: "Admin" });
lru.put("user:102", { name: "Bob", role: "Engineer" });
lru.put("user:103", { name: "Charlie", role: "Designer" });

console.log("Current cache entries:");
console.table(lru.state);

console.log("Accessing key 'user:101' (making it most recent)...");
lru.get("user:101");

console.log("Adding fourth user 'user:104' (should evict 'user:102')...");
lru.put("user:104", { name: "David", role: "DevOps" });

console.log("Updated cache entries:");
console.table(lru.state);

return lru.state;`
  },
  {
    id: 'event-loop',
    title: 'Event Loop & Microtask Proof',
    category: 'Async & Promises',
    description: 'Visualizing JavaScript execution order: Synchronous vs Microtasks (Promise/queueMicrotask) vs Macrotasks (setTimeout).',
    mode: 'console',
    code: `// Proving the JavaScript Event Loop Execution Phases
console.log("=== 1. Synchronous Code Starts ===");

// Macrotask (Timer queue)
setTimeout(() => {
  console.log("=== 5. Macrotask executed (setTimeout 0ms) ===");
}, 0);

// Microtask 1 (queueMicrotask)
queueMicrotask(() => {
  console.log("=== 3. Microtask 1 executed (queueMicrotask) ===");
});

// Microtask 2 (Promise resolution)
Promise.resolve().then(() => {
  console.log("=== 4. Microtask 2 executed (Promise.then) ===");
});

// Synchronous execution completes
console.log("=== 2. Synchronous Code Ends ===");

// Wait slightly so async logs flush cleanly in our runner
await new Promise(resolve => setTimeout(resolve, 50));
console.log("Event loop cycle demonstration complete.");`
  },
  {
    id: 'canvas-particles',
    title: 'Interactive Canvas Particle Swarm',
    category: 'DOM & Canvas',
    description: 'Real-time JavaScript graphic animation using requestAnimationFrame and HTML5 Canvas.',
    mode: 'canvas',
    code: `// Interactive Canvas Animation in Vanilla JavaScript
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

// Particle class
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = Math.random() * 2.5 + 1.5;
    this.hue = Math.floor(Math.random() * 60) + 190; // Cool cyan to azure
    this.life = 0;
    this.maxLife = Math.random() * 90 + 60;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life >= this.maxLife || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }

  draw() {
    const alpha = 1 - (this.life / this.maxLife);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = \`hsla(\${this.hue}, 85%, 65%, \${alpha})\`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = \`hsla(\${this.hue}, 90%, 60%, 0.8)\`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// Generate 80 particles
const particles = Array.from({ length: 80 }, () => new Particle());

console.log("Starting Canvas Animation...");

let frame = 0;
function animate() {
  // Semi-transparent trailing clear
  ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
  ctx.fillRect(0, 0, width, height);

  // Connect particles within proximity
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 55) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = \`rgba(100, 200, 255, \${0.25 * (1 - dist / 55)})\`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  frame++;
  if (frame < 240) { // Render 240 active frames (~4 seconds preview loop)
    requestAnimationFrame(animate);
  } else {
    console.log("Canvas animation cycle finished.");
  }
}

animate();
return "Active Canvas rendering running smoothly";`
  },
  {
    id: 'functional-pipeline',
    title: 'Functional Pipelines & Currying',
    category: 'Functional JS',
    description: 'Composing pure functions, auto-currying, and building clean data processing pipelines.',
    mode: 'console',
    code: `// Functional Programming with JavaScript
// Pure functions, Pipe, and Auto-Currying

// 1. Pipe utility: passes output of one function to the next
const pipe = (...fns) => (initialValue) =>
  fns.reduce((acc, fn) => fn(acc), initialValue);

// 2. Auto-curry helper
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried.apply(this, args.concat(nextArgs));
  };
};

// Curried operations
const multiply = curry((a, b) => a * b);
const double = multiply(2);
const triple = multiply(3);

const add = curry((a, b) => a + b);
const addTen = add(10);

const filterGreaterThan = curry((threshold, list) =>
  list.filter(item => item > threshold)
);

const sum = (list) => list.reduce((acc, val) => acc + val, 0);

// Test raw curried functions
console.log("Testing curried functions:");
console.log("double(25):", double(25));
console.log("triple(15):", triple(15));
console.log("addTen(5):", addTen(5));

// 3. Compose a transformation pipeline
const processNumbers = pipe(
  (arr) => arr.map(double),
  (arr) => arr.map(addTen),
  filterGreaterThan(35),
  sum
);

const rawInput = [5, 12, 18, 3, 22];
const output = processNumbers(rawInput);

console.log("Input numbers:", rawInput);
console.log("Processed Pipeline Output:", output);

return { input: rawInput, result: output };`
  }
];
