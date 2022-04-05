var Links = {
    setColor: function (color) {
        // var alist = document.querySelectorAll('a');
        // var i = 0;
        // while(i < alist.length){
        //   alist[i].style.color = color;
        //   i = i + 1;
        // }
        $('a').css('color', color);
    }
}
var Body = {
    setColor: function (color) {
        //document.querySelector('body').style.color = color;
        $('body').css('color', color);
    },
    setBackgroundColor: function (color) {
        // document.querySelector('body').style.backgroundColor = color;
        $('body').css('backgroundColor', color);
    }
}
function nightDayHandler(self) {
    var target = document.querySelector('body');
    if (self.value === 'night') {
        Body.setBackgroundColor('black');
        Body.setColor('white');
        self.value = 'day';

        Links.setColor('white');
    } else {
        Body.setBackgroundColor('white');
        Body.setColor('black');
        self.value = 'night';

        Links.setColor('blue');
    }
}

function fetch_page(name) {
    fetch(name).then(function (response) {
        response.text().then(function (text) {
            document.querySelector('article').innerHTML = text
        })
    })
}

function fetch_list() {
    fetch('list').then(function (response) {
        response.text().then(function (text) {
            items = text.split('\n')
            items.forEach(item => {
                item = item.trim()
                if (item != "")
                    document.querySelector('#nav').innerHTML +=
                        `<li><a href="#!${item}" onclick="fetch_page('${item}')">${item}</a></li> `
            });
        })
    })
}
