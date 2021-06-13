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

module.exports = function(app) {
  app.get('/schwab/:data', async function (request, response, next) {
    const balance = await client.accountsBalanceGet({
      access_token: ACCESS_TOKEN,
    });
    response.attachment(request.params.data);
    response.send(`${balance.data.accounts[0].balances.current}`)
  });
}
