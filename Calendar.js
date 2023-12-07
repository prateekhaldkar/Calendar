var tbody = document.querySelector('#tbd');
        var caption = document.querySelector('caption');

        var mnth = document.querySelector('#months');
        var yrs = document.querySelector('#years');

        var tbl = document.querySelector('#tbl');
        var tbl_yrs = document.querySelector('#tbl_yrs');
        var tbl_mnths = document.querySelector('#tbl_mnths');

        var x = document.querySelector('#x');
        var y = document.querySelector('#y');
        var z = document.querySelector('#z');

        var yrcl = document.querySelector('#yrcl');
        var yrlar = document.querySelector('#yrlar');
        var yrrar = document.querySelector('#yrrar');

        var tbdyr = document.querySelector('#tbdyr');

        var larr, rarr;

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var currentDate = new Date();
        currentDate.setDate(1);

        // ----------------------------------------

        yrlar.onclick = showTbodyYears;
        yrrar.onclick = showTbodyYears;


        function closeYear() {
            y.style.display = 'none';
            x.style.display = 'block';
        }

        yrcl.onclick = closeYear;

        function showMonths() {
            mnth.innerHTML = null;
            for (var i = 0; i < months.length; i++) {
                var opt = document.createElement('option');
                opt.innerText = months[i];
                opt.value = i;
                if (currentDate.getMonth() == i) {
                    opt.selected = true;
                }
                mnth.append(opt);
            }
        }

        showMonths();

        function changeMonth() {
            currentDate.setMonth(mnth.value);

            showCal();
        }

        mnth.onchange = changeMonth;

        function showYears() {
            yrs.innerHTML = null;
            for (var i = 1980; i < 2042; i++) {
                var opt = document.createElement('option');
                opt.innerText = i;
                if (i == currentDate.getFullYear()) {
                    opt.selected = true;
                }
                yrs.append(opt);
            }
        }

        showYears();

        function changeYear() {
            currentDate.setFullYear(yrs.value);
            currentDate.setMonth(currentDate.getMonth() - 1);

            showCal();
        }

        yrs.onchange = changeYear;

        function onColOv() {
            //console.log(this.innerText);
            // this.style.backgroundColor = '#eee';
            this.style.backgroundColor = 'rgb(247, 239, 245)';
            this.style.cursor = 'pointer';
        }

        function onColOt() {
            this.style.backgroundColor = '#fff';
        }

        function setArrows() {
            larr = document.querySelector('#larr');
            rarr = document.querySelector('#rarr');

            larr.onclick = showPrevious;
            rarr.onclick = showNext;
        }


        function showFinalOutput() {
            month_choice = this.monthIndex;


            currentDate.setFullYear(year_choice);
            currentDate.setMonth(month_choice);

            // console.log(typeof year_choice, typeof month_choice);
            // console.log(currentDate);

            z.style.display = 'none';
            x.style.display = 'block';

            showCal();
        }

        var month_choice = null;
        var k = 0;
        function showTbodyMonths() {
            year_choice = parseInt(this.innerText);

            y.style.display = 'none';
            tbl_mnths.innerHTML = null;

            for (var i = 0; i < 3; i++) {
                var row = tbl_mnths.insertRow(i);

                for (var j = 0; j < 4; j++) {
                    var col = row.insertCell(j);
                    col.innerText = months[k];
                    col.monthIndex = k++;
                    col.className = 'yr_rc';
                    col.onclick = showFinalOutput;
                }
            }

            k = 0;

            z.style.display = 'block';
        }

        var year_choice = null;
        var startYr;
        function showTbodyYears() {
            x.style.display = 'none';

            tbdyr.innerHTML = null;


            if (this instanceof HTMLSpanElement)
                startYr = currentDate.getFullYear() - 4;
            else {
                if (this.id == 'yrlar')
                    startYr = startYr - 9;
                else
                    startYr = startYr + 9;
            }

            var start_year = startYr;
            for (var i = 0; i < 3; i++) {
                var row = tbdyr.insertRow(i);

                for (var j = 0; j < 3; j++) {
                    var col = row.insertCell(j);
                    col.innerText = start_year++;
                    col.className = 'yr_rc';
                    col.onclick = showTbodyMonths;
                }
            }

            y.style.display = 'block';
        }

        function showCal() {
            tbody.innerHTML = null;

            showMonths();
            showYears();

            var currentDay = currentDate.getDay();
            var currentMonth = currentDate.getMonth();

            caption.innerHTML = '<img src="arrow_l.png" height="28" id="larr"> '
                + '<span id="cr_monyr">' + months[currentDate.getMonth()]
                + ', ' + currentDate.getFullYear() + '</span>'
                + ' <img src="arrow_r.png" height="28" id="rarr">';

            setArrows();

            var cr_monyr = document.querySelector('#cr_monyr');
            cr_monyr.onclick = showTbodyYears;

            var i = 0;
            var start = true;
            var end = true;
            do {
                var row = tbody.insertRow(i++);

                for (j = 0; j < 7; j++) {
                    var col = row.insertCell(j);

                    if (start && j == currentDay) {
                        col.innerText = currentDate.getDate();
                        currentDate.setDate(currentDate.getDate() + 1);
                        start = false;
                    } else if (!start && end) {
                        if (currentDate.getMonth() == currentMonth) {
                            col.innerText = currentDate.getDate();
                            currentDate.setDate(currentDate.getDate() + 1);
                        } else {
                            end = false;
                        }
                    }

                    col.onmouseover = onColOv;
                    col.onmouseout = onColOt;
                }
            } while (end);
        }

        showCal();

        function showPrevious() {
            currentDate.setMonth(currentDate.getMonth() - 2);
            showCal();
        }

        function showNext() {
            currentDate.setMonth(currentDate.getMonth());
            showCal();
        }