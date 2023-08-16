import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./libs/ddbClient.js";

// Set the parameters
export const params = {
  TableName: "TABLE_NAME", //TABLE_NAME
  Key: {
    KEY_NAME: { N: "KEY_VALUE" },
  },
  ProjectionExpression: "ATTRIBUTE_NAME",
};

export const run = async () => {
  const data = await ddbClient.send(new GetItemCommand(params));
  console.log("Success", data.Item);
  return data;
  

};
run();