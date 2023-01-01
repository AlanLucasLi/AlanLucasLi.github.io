        //變數
        let color = 18;
        let name;
        let index = 0;
        let time;
        let carColorsArray;

        //DOM
        const img = document.querySelector('.KV-pic').querySelector('img');
        const selections_name = document.querySelector('.selections-name');
        const btn_color = document.querySelectorAll('.btn-color');
        const btn_turn = document.querySelectorAll('.btn-turn');

        //Onlond
        window.onload = function () {
            changeColorSet(color)
            btn_color.forEach((btn) => btn.addEventListener('click', changeColor));
            btn_turn.forEach(btn => btn.addEventListener('mousedown', delayBtn))
            btn_turn.forEach(btn => btn.addEventListener('mouseup', function () {
                clearInterval(time);
            }))
            btn_turn.forEach(btn => btn.addEventListener('mouseout', function () {
                clearInterval(time);
            }))
        };

        //Function
        function changeColorSet(color) {
            carColorsArray = [];
            for (let i = 1; i < 61; i++) {
                let url = `./img/360EXT_1_${color}_${i}.png`;
                carColorsArray.push(url);
            }
            img.src = carColorsArray[index];
        }

        function changeColor(e) {
            color = e.target.dataset.color;
            name = e.target.dataset.name
            changeColorSet(color)
            selections_name.innerText = `${name}`;
        }

        function delayBtn(e) {
            let trun = e.target.dataset.trun;
            time = setInterval(function () {
                turnAround(trun);
            }, 50);
        }

        function turnAround(trun) {
            if (trun === "left") {
                if (index <= 58) {
                    index++;
                }
                else if (index == 59) {
                    index = 0;
                }
            }
            else {
                if (index > 0) {
                    index--;
                }
                else if (index == 0) {
                    index = 59;
                }
            }
            img.src = carColorsArray[index];
        }