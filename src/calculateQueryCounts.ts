import fs from "fs";
import readline from "readline";

const queryCountsMap = new Map<string, Set<string>>();
export function calculateQueryCountsFromLogFile(path: string) {
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

    // Update the query counts for the respective date prefixes
    updateQueryCounts(datePrefixYear, query);
    updateQueryCounts(datePrefixMonth, query);
    updateQueryCounts(datePrefixDay, query);
    updateQueryCounts(datePrefixHour, query);
    updateQueryCounts(datePrefixMinute, query);
  });

  rl.on('close', () => {
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(`Query counts calculated and stored. Length: ${queryCountsMap.size}`);
    console.log('Elapsed Time:', elapsedTime.toFixed(2), 'ms');
  });
}

function updateQueryCounts(datePrefix: string, query: string) {
  const queriesSet = queryCountsMap.get(datePrefix) || new Set<string>();
  queriesSet.add(query);
  queryCountsMap.set(datePrefix, queriesSet);
}

export const getQueryCountsMap = () => queryCountsMap


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
    const queriesSet = getQueryCountsMap().get(arrE)
    const count = queriesSet?.size
  }
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log('Elapsed Time:', elapsedTime.toFixed(2), 'ms');
}
