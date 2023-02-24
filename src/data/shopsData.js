export async function getShopsData() {
  const response = await fetch('https://eu-central-1.aws.data.mongodb-api.com/app/data-ngpoq/endpoint/data/v1/action/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': '2Xyb6zk9mkSNb1knmcAEdX1GCahmGhyi3YMFM8qo9YW86hoVEigf2GGTe8iqNpG8',
    },
    body: JSON.stringify({
      "collection": "10Shops",
      "database": "Top10",
      "dataSource": "DBDatabase",
      "projection": {
        "_id": 0
      }
    })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const shopsData = await response.json();
  return shopsData;
}
