const asyncHttpsRequest = require('../app/utils/asyncHttpsRequest');

function buildUrlEncodedQuery (siren, name, address) {
  const port = 8000;
  const url = 'http://localhost:' + port + '/searchPhoneNumbers' + '?siren=' + siren + '&name=' + name + '&address=' + address;
  return (url);
}

// FOLLOWING REQUESTS DO NOT NEED PLACE_API_KEY
test('URLENCODED_FUNC_FOR_TESTING : SHOULD ALWAYS PASS: If not, do not trust the next tests result', () => {
  let url = buildUrlEncodedQuery('301941407', 'SA LUBING INTERNATIONAL', '62840 SAILLY SUR LA LYS');
  expect(url).toBe('http://localhost:8000/searchPhoneNumbers?siren=301941407&name=SA LUBING INTERNATIONAL&address=62840 SAILLY SUR LA LYS');

  url = buildUrlEncodedQuery('303830244', 'EXPERDECO', '74970 MARIGNIER');
  expect(url).toBe('http://localhost:8000/searchPhoneNumbers?siren=303830244&name=EXPERDECO&address=74970 MARIGNIER');
});

test('USAGE_ERROR : INVALID_SIREN: 1/3. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  const url = buildUrlEncodedQuery('31022713', 'SOCIETE FRANCAISE DE BATIMENT', '59562 LA MADELEINE CEDEX');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"err":"Usage : GET request: localhost:8000/searchPhoneNumbers ; Necessary fields : siren (string && siren.length == 9), name (string), address (string)","num":null,"name":"SOCIETE FRANCAISE DE BATIMENT"}]');
});

test('USAGE_ERROR : INVALID_SIREN: 2/3. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  const url = buildUrlEncodedQuery('3102271370', 'SOCIETE FRANCAISE DE BATIMENT', '59562 LA MADELEINE CEDEX');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"err":"Usage : GET request: localhost:8000/searchPhoneNumbers ; Necessary fields : siren (string && siren.length == 9), name (string), address (string)","num":null,"name":"SOCIETE FRANCAISE DE BATIMENT"}]');
});

test('USAGE_ERROR : INVALID_SIREN: 3/3. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  const url = buildUrlEncodedQuery('', 'SOCIETE FRANCAISE DE BATIMENT', '59562 LA MADELEINE CEDEX');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"err":"Usage : GET request: localhost:8000/searchPhoneNumbers ; Necessary fields : siren (string && siren.length == 9), name (string), address (string)","num":null,"name":"SOCIETE FRANCAISE DE BATIMENT"}]');
});

test('USAGE_ERROR : INVALID_NAME: 1/1. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  const url = buildUrlEncodedQuery('310227137', '', '59562 LA MADELEINE CEDEX');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"err":"Usage : GET request: localhost:8000/searchPhoneNumbers ; Necessary fields : siren (string && siren.length == 9), name (string), address (string)","num":null,"name":""}]');
});

test('USAGE_ERROR : INVALID_ADDRESS: 1/1. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  const url = buildUrlEncodedQuery('310227137', 'SOCIETE FRANCAISE DE BATIMENT', '');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"err":"Usage : GET request: localhost:8000/searchPhoneNumbers ; Necessary fields : siren (string && siren.length == 9), name (string), address (string)","num":null,"name":"SOCIETE FRANCAISE DE BATIMENT"}]');
});

test('INVALID_ROUTE : 404 NOT FOUND: 1/1. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  try {
    const url = 'http://localhost:8000/NON_EXISTING_ROUTE?siren=310227137&name=SOCIETE FRANCAISE DE BATIMENT&address=59562 LA MADELEINE CEDEX';
    await asyncHttpsRequest(url, true);
  } catch (error) {
    expect(error).toBe('[{"err":"Not Found","name":null,"num":null}]');
  }
});

// FOLLOWING REQUESTS NEED PLACE_API_KEY
test('VALID_INPUT : INFO_FOUND: 1/6. expectedResult = [{name: companyName, nbr: phoneNumber, err: null}]', async () => {
  const url = buildUrlEncodedQuery('312180292', 'EXPERDECO', '74970 MARIGNIER');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"name":"Experdéco","num":"+33 4 50 34 63 54","err":null}]');
});

test('VALID_INPUT : INFO_FOUND: 2/6. expectedResult = [{name: companyName, nbr: phoneNumber, err: null}]', async () => {
  const url = buildUrlEncodedQuery('312520455', 'MENUISERIE GENERALE SALAUD', '85710 BOIS DE CENE');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"name":"SARL Grosseau S.A.L.A.U.D","num":"+33 2 51 68 19 46","err":null}]');
});

test('VALID_INPUT : INFO_FOUND: 3/6. expectedResult = [{name: companyName, nbr: phoneNumber, err: null}]', async () => {
  const url = buildUrlEncodedQuery('301941407', 'SA LUBING INTERNATIONAL', '62840 SAILLY SUR LA LYS');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"name":"S.a Lubing International","num":"+33 3 21 27 60 68","err":null}]');
});

test('VALID_INPUT : INFO_FOUND: 4/6. expectedResult = [{name: companyName, nbr: phoneNumber, err: null}]', async () => {
  const url = buildUrlEncodedQuery('311935241', 'HOTEL BELLEVUE', '71000 MACON');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"name":"Brit Hotel Mâcon Centre","num":"+33 3 85 38 18 10","err":null}]');
});

test('VALID_INPUT : INFO_FOUND: 5/6. expectedResult = [{name: companyName, nbr: phoneNumber, err: null}]', async () => {
  const url = buildUrlEncodedQuery('312180292', 'JARDILLIER MEUNIER RENUCCI ROSE WOHL', '06300 NICE');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"name":"Notaires associés Jardillier, Meunier, Renucci, Rose et Wohl-Dahan","num":"+33 4 93 92 86 20","err":null}]');
});

test('VALID_INPUT : INFO_FOUND: 6/6. expectedResult = [{name: companyName, nbr: phoneNumber, err: null}]', async () => {
  const url = buildUrlEncodedQuery('312936875', 'PARIS ATELIERS', '75004 PARIS');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"name":"Paris Ateliers","num":"+33 1 44 61 87 87","err":null}]');
});

test('VALID_INPUT : INFO_NOT_FOUND: 1/3. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  const url = buildUrlEncodedQuery('310227137', 'SOCIETE FRANCAISE DE BATIMENT', '59562 LA MADELEINE CEDEX');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"err":"No place informations found","num":null,"name":"SOCIETE FRANCAISE DE BATIMENT"}]');
});

test('VALID_INPUT : INFO_NOT_FOUND: 2/3. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  const url = buildUrlEncodedQuery('308198449', 'ATMOSPHERE', '07110 CHASSIERS');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"err":"No place informations found","num":null,"name":"ATMOSPHERE"}]');
});

test('VALID_INPUT : INFO_NOT_FOUND: 3/3. expectedResult = [{err: errMsg, num:null, name: companyName}]', async () => {
  const url = buildUrlEncodedQuery('308701531', 'ETS PHILIBERT ET CIE', '42580 L ETRAT');
  const ret = await asyncHttpsRequest(url, true);
  expect(ret).toBe('[{"err":"No place informations found","num":null,"name":"ETS PHILIBERT ET CIE"}]');
});

// Note Google API can return one or two place_id so difficult to test
