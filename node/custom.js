const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

module.exports = function(app, client) {
  app.get('/schwab/tri', async function (request, response, next) {
    const balance = await client.accountsBalanceGet({
      access_token: ACCESS_TOKEN,
    });
    response.attachment('tri.csv');
    response.send(`${balance.data.accounts[0].balances.current}`)
  });
}
