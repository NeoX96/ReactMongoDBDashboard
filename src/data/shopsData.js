export async function getShopsData() {
  const data = JSON.stringify({
    "collection": "10Shops",
    "database": "Top10",
    "dataSource": "DBDatabase",
    "projection": {}
  });

  const response = await fetch('https://eu-central-1.aws.data.mongodb-api.com/app/data-uilqj/endpoint/data/v1/action/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': '7PodJEFumzYtvIBgsWkiBMp5N1ifzHkrRMO9XTvRSxVBH5TIq5kJdXhLxE7RKWKM',
    },
    body: data
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const shopsData = await response.json();
  return shopsData;
}
