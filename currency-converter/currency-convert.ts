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
const getExchangeRate = async (symbols:string) => {
        try {
            let response;
            response =  await axios.get(`${currencyUrl}&symbols=${symbols}`);
            rate = response.data.rates.INR;
            return rate;
        }catch (e) {
            //async/await sets catch block of promise if an error is thrown automatically
            throw new Error(`Can't find rates with symbol ${symbols}`)
        }



};

getExchangeRate("INR").then((rate) => {
   console.log(`getExchangeRate: ${rate}`);
});


/**
 * getting all countries that accept INR
 * @param currency
 */
const getCountries = async (currency: string) => {

        try{
            let response;
            response = await axios.get(`${countryUrl}${currency}`);
            // @ts-ignore
            countries = response.data.map((country) => country.name);
            return countries;
        }catch (e) {
            throw new Error(`Can't find country with currency ${currency}`)
        }


};

getCountries("INR").then((countries) => {
   console.log(`getCountries: ${countries}`);
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
}).catch((e) => {
    console.log(`ERROR ******** ${e.message}`);
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
}).catch((e) => {
    console.log(`ERROR ******** ${e.message}`);
});