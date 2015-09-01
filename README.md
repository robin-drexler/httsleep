# httsleep

It's a simple service for producing delayed http calls.

Can for example be used to test asynchronous scenarios where you need to figure out how components behave when requests (for example ajax requests) take longer than in your normal environment and Chrome network throttling just is not enough.
It can also be useful to test timeout behavior of client libraries.

You only need to add the number of seconds, you'd like a request to wait before it is answered, to an url. Just like: [http://httsleep.robin-drexler.com/2](http://httsleep.robin-drexler.com/2)

The maximun delay currently is 120 seconds.
