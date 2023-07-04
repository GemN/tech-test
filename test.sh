#!/bin/bash

urlCountMap=(
  "http://google.com:::617" # should error
  "http://localhost:3000/queries/count/2015:::573697"
  "http://localhost:3000/queries/count/1945:::0"
  "http://localhost:3000/queries/count/abcdef:::0"
  "http://localhost:3000/queries/count/2015-08:::573697"
  "http://localhost:3000/queries/count/2015-08-03:::198117"
  "http://localhost:3000/queries/count/2015-08-01%2000:04:::617"
)

for url in "${urlCountMap[@]}"; do
  urlValue="${url%%:::*}"
  urlCount="${url##*:::}"
  response=$(curl -s -X GET "$( echo "$urlValue" | sed 's/ /%20/g' )")
  if [[ $response =~ "count" ]]; then
    actualCount=$(echo "${response}" | jq -r '.count')

    if [[ "${actualCount}" -eq "${urlCount}" ]]; then
      echo "✅ ${urlCount} = ${actualCount} - ${urlValue}"
    else
      echo "❌ ${urlCount} != ${actualCount} - ${urlValue}"
    fi
  else
    echo "❌ Incorrect URL: ${url}"
  fi
done
