const { Configuration, PlaidEnvironments, PlaidApi } = require('plaid');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

exports.schwabBalanceCsv = async (req, res) => {
  const balance = await client.accountsBalanceGet({
    access_token: ACCESS_TOKEN,
  });
  res.attachment('balance.csv');
  res.send(`${balance.data.accounts[0].balances.current}`);
}
