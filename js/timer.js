/**
 * 时间、倒计时、计时器js
 * Created by chenyi on 2016/03/22.
 */

$(document).ready(function () {
    $('#CountDownTimer').TimeCircles({ time: {
        Days: { show: false},
        Hours: { show: false },
        Minutes: {
            show:false
        },
        Seconds: {
            show:true,
            text: '秒',
            color: '#F99'
        }
    },
        refresh_interval: 0.1,
        count_past_zero: false,
        circle_bg_color: '#eee',
        fg_width: 0.05,
        bg_width: 1
    });
});