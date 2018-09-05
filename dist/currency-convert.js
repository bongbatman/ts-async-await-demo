"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// EUR INR 1
//1 EUR is worth 83 INR. You can spend these in following countries:
var axios_1 = require("axios");
var currencyUrl = "http://data.fixer.io/api/latest?access_key=5985adbcca142b995e78c3974b29566a";
var countryUrl = "https://restcountries.eu/rest/v2/currency/";
var rate;
var countries;
/**
 * EUR to INR exchange rate on base free plan
 * @param symbols
 */
var getExchangeRate = function (symbols) {
    return axios_1.default.get(currencyUrl + "&symbols=" + symbols).then(function (response) {
        rate = response.data.rates.INR;
        return rate;
    });
};
getExchangeRate("INR").then(function (rate) {
    console.log(rate);
});
/**
 * getting all countries that accept INR
 * @param currency
 */
var getCountries = function (currency) {
    return axios_1.default.get("" + countryUrl + currency).then(function (response) {
        // @ts-ignore
        countries = response.data.map(function (country) { return country.name; });
        return countries;
    });
};
getCountries("INR").then(function (countries) {
    console.log(countries);
});
/**
 * Promise version of currency conversion
 * @param to
 * @param amount
 */
var convertCurrencyPromise = function (to, amount) {
    var countries;
    return getCountries(to).then(function (tempCountries) {
        countries = tempCountries;
        return getExchangeRate(to);
    }).then(function (rate) {
        var exchangedAmount = amount * rate;
        return amount + " EUR is worth " + exchangedAmount + " INR. You can spend these in following countries: \n" + countries.join(' * ') + " ";
    });
};
convertCurrencyPromise("INR", 1).then(function (res) {
    console.log(res);
});
var convertCurrencyAsync = function (to, amount) { return __awaiter(_this, void 0, void 0, function () {
    var countries, exchangeRate, exchangedAmount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getCountries(to)];
            case 1:
                countries = _a.sent();
                return [4 /*yield*/, getExchangeRate(to)];
            case 2:
                exchangeRate = _a.sent();
                exchangedAmount = amount * exchangeRate;
                return [2 /*return*/, "\n-----------------------------> ASYNC/AWAIT\n" + amount + " EUR is worth " + exchangedAmount + " INR. You can spend " + to + " in following countries: \n" + countries.join(' * ') + "\n-----------------------------> ASYNC/AWAIT\n"];
        }
    });
}); };
convertCurrencyAsync("INR", 100).then(function (res) {
    console.log(res);
});
