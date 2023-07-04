Credits: originally copied from an Algolia interview test.

# Technical test

The goal of this test is to evaluate your ability to parse and process a large amount of data and to use the appropriate data structures to solve a challenge.

The goal is to extract the popular (most frequent) queries done during a specific time range from a given log dataset.

The provided [sample file](https://www.dropbox.com/s/duv704waqjp3tu1/hn_logs.tsv.gz?dl=0) is a TSV file listing all queries performed on [HN Search](https://hn.algolia.com) during a few days.
Each line contains a timestamp and a query separated by a tab.


## Instructions

Build a small application exposing the following endpoint through a REST API (tip: we use [FastAPI](https://github.com/tiangolo/fastapi) framework):

* `GET /queries/count/<DATE_PREFIX>`: returns a JSON object specifying the number of distinct queries that have been done during a specific time range

### Sample expected results

* Distinct queries done in 2015: `GET /queries/count/2015`: `{"count": 573697}`
* Distinct queries done in Aug: `GET /queries/count/2015-08`: `{"count": 573697}`
* Distinct queries done on Aug 3rd: `GET /queries/count/2015-08-03`: `{"count": 198117}`
* Distinct queries done on Aug 1st between 00:04:00 and 00:04:59: `GET /queries/count/2015-08-01 00:04`: `{"count": 617}`

### Guidelines

* You can use third party libraries if you know how to re-implement the features they're providing. Specifically: don't use any data analysis library (no pandas!).
* Feel free to use a web framework like Flask/FastAPI if you want to.
* Your application cannot depend on any database or external software (one of the goals being to evaluate your ability to choose the right data structures)
* Provide a solution in Python or TypeScript. For any other language, please check with us first.
* Don't overthink the assignment. Provide a solution that you would be happy to push to production
* If you have several implementations in mind, pick one and discuss the alternatives in the README of your project

### Evaluation Criteria

* Please push your code to a GitHub repository or send us an archive
* Include a Readme helping us run your service
* Include a section about your thought process explaining your choices and share other alternative designs you considered
* Add any information you deem interesting for us to better understand your assignment

We'll evaluate:

* The complexity & scalability of your algorithm
* The readability of your code (including readability of your tests)
* The correctness of the outputs of the API
* You're ability to share your design choices and clearly weight pros & cons of alternative solutions
* The overall quality of your written technical communication


If you have any question, please reach out to the recruiter you are in touch with. For the evaluation, we do not take into account the fact that you did or did not ask a question.

Good luck!

