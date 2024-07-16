import { writeFileSync } from 'fs';

import $RefParser from '@apidevtools/json-schema-ref-parser';

const main = async () => {
  const parser = new $RefParser();
  const schema = await parser.dereference(__dirname + '/schema_input.json');
  // Edit this path to target the JSON schema that the send message endpoint uses
  const body = schema['components']['schemas']['api.v2010.account.message'];
  writeFileSync(__dirname + '/schema_output.json', JSON.stringify(body, null, 2));

  console.log('schema.json updated');
};

main();
