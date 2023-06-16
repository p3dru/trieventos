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
    //console.log(option.key)
})

var comparativo = [{i: 6, j: 1}, {i: 1, j: 1}, {i: 2, j: 2}, {i: 3, j: 3}, {i: 4, j: 4}]
//console.log(comparativo.length)

for (let i = 0; i < 5; i++){
    for (let j = 0; j < 5; j++){
        for (let h = 0; h < comparativo.length; h++){
            if (i == comparativo[h].i) {
                if (j == comparativo[h].j){
                    console.log("[xx]");
                } else {
                    if (j != comparativo[h].j){
                        console.log('[diferente]');
                    }
                }
            }
        }
    }
    //console.log()
}

