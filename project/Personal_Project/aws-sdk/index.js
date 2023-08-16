const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'esp32DataVer3.1';
const checkPath = '/health';
const aDataPath = '/espdata';
const datasPath = '/chartdata';

exports.handler = async function(event) {
  console.log('Request event: ', event);
  let response;
  switch(true) {
    case event.httpMethod === 'GET' && event.path === checkPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.path === aDataPath:
      response = await getNewestDatas(1);
      // response = await getProduct(event.queryStringParameters.timeStamp);
      break;
    case event.httpMethod === 'GET' && event.path === datasPath:
      response = await getNewestDatas(10);
      // ko cần default (auto trả về 404 nếu ko khớp với bất cứ cái nào ở trên)
  }
  return response;
}

function buildResponse(statusCode, body) { // hàm hiểm thị - thông báo Response (body) cùng với statusCode
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'text/json'
    },
    body: JSON.stringify(body)
  }
}

async function getNewestDatas(index) {
  const timestamp = Date.now();
  const params = {
    TableName: dynamodbTableName,
    KeyConditionExpression: '#pk > :pk',
    ExpressionAttributeNames: { '#pk': 'timestamp' },
    ExpressionAttributeValues: { ':pk': timestamp },
    ScanIndexForward: false,
    Limit: index,
  };

  try {
    const response = await dynamodb.query(params).promise();
    const newestItems = response.Items;
    return buildResponse(200, newestItems);
  } catch (error) {
    console.error('Error retrieving newest data: ', error);
    return buildResponse(500, { error: 'Internal Server Error' });
  }
}


// async function getProduct(timeStamp) {
//   const params = {
//     TableName: dynamodbTableName,
//     Key: {
//       'timeStamp': timeStamp
//     }
//   }
//   return await dynamodb.get(params).promise().then((response) => {
//     return buildResponse(200, response.Item);
//   }, (error) => {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   });
// }

// async function getProducts() {
//   const params = {
//     TableName: dynamodbTableName
//   }
//   const allProducts = await scanDynamoRecords(params, []);
//   const body = {
//     products: allProducts
//   }
//   return buildResponse(200, body);
// }

// async function scanDynamoRecords(scanParams, itemArray) {
//   try {
//     const dynamoData = await dynamodb.scan(scanParams).promise();
//     itemArray = itemArray.concat(dynamoData.Items);
//     if (dynamoData.LastEvaluatedKey) {
//       scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
//       return await scanDynamoRecords(scanParams, itemArray);
//     }
//     return itemArray;
//   } catch(error) {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   }
// }

// async function saveProduct(requestBody) {
//   const params = {
//     TableName: dynamodbTableName,
//     Item: requestBody
//   }
//   return await dynamodb.put(params).promise().then(() => {
//     const body = {
//       Operation: 'SAVE',
//       Message: 'SUCCESS',
//       Item: requestBody
//     }
//     return buildResponse(200, body);
//   }, (error) => {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   })
// }

// async function modifyProduct(timeStamp, updateKey, updateValue) {
//   const params = {
//     TableName: dynamodbTableName,
//     Key: {
//       'timeStamp': timeStamp
//     },
//     UpdateExpression: `set ${updateKey} = :value`,
//     ExpressionAttributeValues: {
//       ':value': updateValue
//     },
//     ReturnValues: 'UPDATED_NEW'
//   }
//   return await dynamodb.update(params).promise().then((response) => {
//     const body = {
//       Operation: 'UPDATE',
//       Message: 'SUCCESS',
//       UpdatedAttributes: response
//     }
//     return buildResponse(200, body);
//   }, (error) => {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   })
// }

// async function deleteProduct(timeStamp) {
//   const params = {
//     TableName: dynamodbTableName,
//     Key: {
//       'timeStamp': timeStamp
//     },
//     ReturnValues: 'ALL_OLD'
//   }
//   return await dynamodb.delete(params).promise().then((response) => {
//     const body = {
//       Operation: 'DELETE',
//       Message: 'SUCCESS',
//       Item: response
//     }
//     return buildResponse(200, body);
//   }, (error) => {
//     console.error('error :v ', error);
//   })
// }

