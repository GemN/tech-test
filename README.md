# Ondorse Test

Before running this project, ensure you have the following installed:

- Node.js 
- npm or Yarn

## Installation
To install the project dependencies, run the following command:

```sh
npm install
``` 
or
```sh
yarn install
``` 

## Build
To build the project, run the following command:

```sh
yarn build
```

## Usage
To run the project after it has been built, use the following command:

```sh
yarn start
```

Add your sample file in the sample folder.

By default, the project uses the sample file located at **SAMPLE_PATH**. To provide a different sample file, modify the **SAMPLE_PATH** environment variable accordingly.

## Testing

Running the script will test the project with TEST.MD values (and some extra)
```sh
./test.sh
```

## Thought process

### What & Why
I started with a naïve approach where I processed the file using a Map (for dates) combined with a Set (for distinct queries) to get the results. 
- The approx. time on my machine is ~5s to do all the calculation. 
- The look-up is instant (31ms for 1M ops).

This could lead to scalability issues with bigger datasets but in my opinion acceptable for datasets of few days. 

### Alternative designs

I tried using a prefix-trie approach, but after testing I found out it's less efficient:
- More processing time for calculation (~8s)
- Look-up take more time (~210ms for 1M ops)
- Bigger size in memory (a bit more than Map/set approach)

I also thought doing on-demand calculation for very huge datasets using an approximation approach 

We know that a logfile is chronologically ordered hence we could try to find the beginning of the calculation based on the precision asked with a bisection method.


