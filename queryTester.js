const asyncHttpsRequest = require('./asyncHttpsRequest');

function buildUrlEncodedQuery (siren, name, address) {
  const port = 8000;
  const url = 'http://localhost:' + port + '?siren=' + siren + '&name=' + name + '&address=' + address;
  return (url);
}

async function testSearchPhoneNumber (siren, name, address) {
  const url = buildUrlEncodedQuery(siren, name, address);
  const res = await asyncHttpsRequest(url, true);
  console.log(res);
  return (res);
}

const input = [{ siren: '301941407', name: 'SA LUBING INTERNATIONAL', address: '62840 SAILLY SUR LA LYS' },
  { siren: '303830244', name: 'EXPERDECO', address: '74970 MARIGNIER' },
  { siren: '308198449', name: 'ATMOSPHERE', address: '07110 CHASSIERS' },
  { siren: '308701531', name: 'ETS PHILIBERT ET CIE', address: '42580 L ETRAT' },
  { siren: '310227137', name: 'SOCIETE FRANCAISE DE BATIMENT', address: '59562 LA MADELEINE CEDEX' },
  { siren: '310590773', name: 'CHINA ARTS', address: '75010 PARIS' },
  { siren: '311935241', name: 'HOTEL BELLEVUE', address: '71000 MACON' },
  { siren: '312180292', name: 'JARDILLIER MEUNIER RENUCCI ROSE WOHL', address: '06300 NICE' },
  { siren: '312520455', name: 'MENUISERIE GENERALE SALAUD', address: '85710 BOIS DE CENE' },
  { siren: '312936875', name: 'PARIS ATELIERS', address: '75004 PARIS' }];

// for (let i = 0; i < input.length; i++) {
//   const chosenInput = input[i];
//   testSearchPhoneNumber(chosenInput.siren, chosenInput.name, chosenInput.address);
// }

const chosenInput = input[5];
testSearchPhoneNumber(chosenInput.siren, chosenInput.name, chosenInput.address);
