# Epic Seven Helpers

## TODO
    
* report: need a language based HP format, we usually use 10k as a unit.
formatHp: function (num) { return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 10000).toFixed(2)) + '万(10k in chinese)' : Math.sign(num) * Math.abs(num) },
* speed: we could have a push back % input, and add this value to enemies CR%.