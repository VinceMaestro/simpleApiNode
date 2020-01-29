const { searchPhoneNumbers } = require('./searchPhoneNumbers');

test('Should output a string representing a json object [{name: companyName, nbr: phoneNumber, err: null}]', async () => {
  let ret = await searchPhoneNumbers('312180292', 'EXPERDECO', '74970 MARIGNIER');
  expect(ret).toBe('[{"name":"Experdéco","num":"+33 4 50 34 63 54","err":null}]');
  ret = await searchPhoneNumbers('312520455', 'MENUISERIE GENERALE SALAUD', '85710 BOIS DE CENE');
  expect(ret).toBe('[{"name":"SARL Grosseau S.A.L.A.U.D","num":"+33 2 51 68 19 46","err":null}]');
  ret = await searchPhoneNumbers('301941407', 'SA LUBING INTERNATIONAL', '62840 SAILLY SUR LA LYS');
  expect(ret).toBe('[{"name":"S.a Lubing International","num":"+33 3 21 27 60 68","err":null}]');
  ret = await searchPhoneNumbers('311935241', 'HOTEL BELLEVUE', '71000 MACON');
  expect(ret).toBe('[{"name":"Brit Hotel Mâcon Centre","num":"+33 3 85 38 18 10","err":null}]');
  ret = await searchPhoneNumbers('312180292', 'JARDILLIER MEUNIER RENUCCI ROSE WOHL', '06300 NICE');
  expect(ret).toBe('[{"name":"Notaires associés Jardillier, Meunier, Renucci, Rose et Wohl-Dahan","num":"+33 4 93 92 86 20","err":null}]');
  ret = await searchPhoneNumbers('312936875', 'PARIS ATELIERS', '75004 PARIS');
  expect(ret).toBe('[{"name":"Paris Ateliers","num":"+33 1 44 61 87 87","err":null}]');
});

// Google API can return one or two place_id so difficult to test
// test('Should output a string representing a json object [{name: company1Name, nbr: phoneNumber, err: null}, {name: company2Name, nbr: phoneNumber, err: null}]', async () => {
//   const ret = await searchPhoneNumbers('310590773', 'CHINA ARTS', '75010 PARIS');
//   expect(ret).toBe('[{"name":"China Arts","num":"+33 1 42 06 89 64","err":null},{"name":"Restaurant Petit Villa","num":"+33 1 44 61 42 91","err":null}]');
// })

test('Should output a string representing a json object [{err: errMsg, num:null, name: companyName}]', async () => {
  let ret = await searchPhoneNumbers('310227137', 'SOCIETE FRANCAISE DE BATIMENT', '59562 LA MADELEINE CEDEX');
  expect(ret).toBe('[{"err":"No place informations found","num":null,"name":"SOCIETE FRANCAISE DE BATIMENT"}]');
  ret = await searchPhoneNumbers('308198449', 'ATMOSPHERE', '07110 CHASSIERS');
  expect(ret).toBe('[{"err":"No place informations found","num":null,"name":"ATMOSPHERE"}]');
  ret = await searchPhoneNumbers('308701531', 'ETS PHILIBERT ET CIE', '42580 L ETRAT');
  expect(ret).toBe('[{"err":"No place informations found","num":null,"name":"ETS PHILIBERT ET CIE"}]');
});

// [{"err":"No place informations found","num":null,"name":"SOCIETE FRANCAISE DE BATIMENT"}]
// [{"err":"No place informations found","num":null,"name":"ATMOSPHERE"}]
// [{"err":"No place informations found","num":null,"name":"ETS PHILIBERT ET CIE"}]
// [{"name":"Experdéco","num":"+33 4 50 34 63 54","err":null}]
// [{"name":"SARL Grosseau S.A.L.A.U.D","num":"+33 2 51 68 19 46","err":null}]
// [{"name":"S.a Lubing International","num":"+33 3 21 27 60 68","err":null}]
// [{"name":"Brit Hotel Mâcon Centre","num":"+33 3 85 38 18 10","err":null}]
// [{"name":"Notaires associés Jardillier, Meunier, Renucci, Rose et Wohl-Dahan","num":"+33 4 93 92 86 20","err":null}]
// [{"name":"China Arts","num":"+33 1 42 06 89 64","err":null},{"name":"Restaurant Petit Villa","num":"+33 1 44 61 42 91","err":null}]
// [{"name":"Paris Ateliers","num":"+33 1 44 61 87 87","err":null}]
