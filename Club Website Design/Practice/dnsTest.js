const { Resolver } = require('dns').promises;
const resolver = new Resolver();

let servers = resolver.getServers();
console.log("DNS Servers:");
console.log(servers);

// Use a different domain name here
resolver.resolve4('newsoffuture.com').then((addresses) => {
    console.log('Address for newsoffuture.com')
    console.log(addresses);
});

// Use a different domain name here
resolver.resolveAny('bayclubs.com').then(info => {
    console.log('All the info for bayclubs.com:')
    console.log(info);
});