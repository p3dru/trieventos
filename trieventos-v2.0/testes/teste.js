//teste de array com json
var links = [
    {
        key: 'opcao1',
        value: 'www.google.com'
    },
    {
        key: 'opcao2',
        value: 'www.twitter.com'
    },
    {
        key: 'opcao3',
        value: 'www.globo.com'
    }, 
]

links.forEach((option) => {
    console.log(option.key)
})