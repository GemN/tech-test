import fs from "fs";
import readline from "readline";

class TrieNode {
  queries: Set<string>;
  children: Map<string, TrieNode>;

  constructor() {
    this.queries = new Set();
    this.children = new Map();
  }
}

class QueryCounter {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insertQuery(datePrefix: string, query: string) {
    let currentNode = this.root;
    const prefixes = datePrefix.split('-');

    for (const prefix of prefixes) {
      if (!currentNode.children.has(prefix)) {
        currentNode.children.set(prefix, new TrieNode());
      }
      currentNode = currentNode.children.get(prefix)!;
    }

    currentNode.queries.add(query);
  }

  getCount(datePrefix: string): number {
    let currentNode = this.root;
    const prefixes = datePrefix.split('-');

    for (const prefix of prefixes) {
      if (!currentNode.children.has(prefix)) {
        return 0;
      }
      currentNode = currentNode.children.get(prefix)!;
    }

    return currentNode.queries.size;
  }
}

const queryCounter = new QueryCounter();

export function generateQueryCounterFromLogFile(path: string) {
  const startTime = performance.now();
  console.log('Beginning calculations...')
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on('line', (line: string) => {
    const [timestampStr, query] = line.split('\t');
    const datePrefixYear = timestampStr.substring(0, 4);
    const datePrefixMonth = timestampStr.substring(0, 7);
    const datePrefixDay = timestampStr.substring(0, 10);
    const datePrefixHour = timestampStr.substring(0, 13);
    const datePrefixMinute = timestampStr.substring(0, 16);

    queryCounter.insertQuery(datePrefixYear, query);
    queryCounter.insertQuery(datePrefixMonth, query);
    queryCounter.insertQuery(datePrefixDay, query);
    queryCounter.insertQuery(datePrefixHour, query);
    queryCounter.insertQuery(datePrefixMinute, query);
  });

  rl.on('close', () => {
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(`Query counts calculated and stored. Length: ${queryCounter.root.children.size}`);
    console.log('Elapsed Time:', elapsedTime.toFixed(2), 'ms');
  });
}

export const getQueryCounter = () => queryCounter;

// Left for discussion
const testingArray = [
  "2015",
  "2015-08",
  "2015-08-03",
  "2015-08-01 00:04"
]
const perfTest = () => {
  const startTime = performance.now();
  console.log("start perf test")
  for (let i = 0; i < 1000000; i++) {
    const arrE = testingArray[i % 4];
    const count = queryCounter.getCount(arrE)
  }
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log('Elapsed Time:', elapsedTime.toFixed(2), 'ms');
}
