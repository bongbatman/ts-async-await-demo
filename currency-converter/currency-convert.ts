// EUR INR 1
//1 EUR is worth 83 INR. You can spend these in following countries:
import axios from "axios";

const currencyUrl: string = "http://data.fixer.io/api/latest?access_key=5985adbcca142b995e78c3974b29566a";
const countryUrl: string = "https://restcountries.eu/rest/v2/currency/";
let rate: number;
let countries: Array<string>;

/**
 * EUR to INR exchange rate on base free plan
 * @param symbols
 */
const getExchangeRate = (symbols:string) => {
    return axios.get(`${currencyUrl}&symbols=${symbols}`).then((response) => {

        rate = response.data.rates.INR;
        return rate;
    });
};

getExchangeRate("INR").then((rate) => {
   console.log(rate);
});


/**
 * getting all countries that accept INR
 * @param currency
 */
const getCountries = (currency: string) => {
  return axios.get(`${countryUrl}${currency}`).then((response) => {

      // @ts-ignore
      countries = response.data.map((country) => country.name);
      return countries;
  });

};

getCountries("INR").then((countries) => {
   console.log(countries);
});


/**
 * Promise version of currency conversion
 * @param to
 * @param amount
 */
const convertCurrencyPromise = (to: string, amount: number) => {
    let countries: string[];
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;
        return `${amount} EUR is worth ${exchangedAmount} INR. You can spend these in following countries: \n${countries.join(' * ')} `;
    });
};

convertCurrencyPromise("INR", 1).then((res) => {
   console.log(res);
});


const convertCurrencyAsync = async (to: string, amount: number) => {
    let countries = await getCountries(to);
    let exchangeRate = await getExchangeRate(to);
    let exchangedAmount = amount * exchangeRate;
    return `\n-----------------------------> ASYNC/AWAIT\n${amount} EUR is worth ${exchangedAmount} INR. You can spend ${to} in following countries: \n${countries.join(' * ')}
-----------------------------> ASYNC/AWAIT
`
};

convertCurrencyAsync("INR", 100).then((res) => {
   console.log(res);
});